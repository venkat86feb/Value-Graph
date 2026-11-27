// Client-side behaviour for the Explore Valuable demo.
// All answers come from the release's question file; nothing is generated
// at runtime, so the same question always gets the same answer.
import type { DemoRelease, GraphNode, ViewKey } from '../../lib/demo-data';
import { isVisible, traceFrom } from './trace';

interface Payload {
  releases: DemoRelease[];
  upcoming: { release: number; title: string }[];
  defaultRelease: number;
}

interface State {
  release: number;
  view: ViewKey;
  question: number | null;
  selected: string | null;
}

const VIEWS: ViewKey[] = ['value', 'portfolio'];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });
}

export function mountValueGraph(root: HTMLElement) {
  const dataEl = root.querySelector<HTMLScriptElement>('[data-vg-data]');
  if (!dataEl?.textContent) return;
  const data = JSON.parse(dataEl.textContent) as Payload;

  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const ui = {
    asOf: $('[data-vg-asof]'),
    viewButtons: [...root.querySelectorAll<HTMLButtonElement>('[data-vg-view]')],
    releases: $('[data-vg-releases]'),
    note: $('[data-vg-note]'),
    questions: $('[data-vg-questions]'),
    answer: $('[data-vg-answer]'),
    answerText: $('[data-vg-answer-text]'),
    answerBasis: $('[data-vg-answer-basis]'),
    answerGaps: $('[data-vg-answer-gaps]'),
    answerFine: $('[data-vg-answer-fine]'),
    graphTitle: $('[data-vg-graph-title]'),
    trace: $('[data-vg-trace]'),
    traceTitle: $('[data-vg-trace-title]'),
    traceText: $('[data-vg-trace-text]'),
    traceClear: $<HTMLButtonElement>('[data-vg-trace-clear]'),
    lenses: $('[data-vg-lenses]'),
    foot: $('[data-vg-foot]'),
  };

  // Initial state, optionally from the URL: /explore/?release=0&view=portfolio
  const params = new URLSearchParams(location.search);
  const wantedRelease = Number(params.get('release'));
  const state: State = {
    release: data.releases.some((r) => r.release === wantedRelease) && params.get('release') !== null
      ? wantedRelease
      : data.defaultRelease,
    view: params.get('view') === 'portfolio' ? 'portfolio' : 'value',
    question: 0,
    selected: null,
  };

  let questionButtons: HTMLButtonElement[] = [];
  let cardButtons = new Map<string, HTMLButtonElement>();

  const current = () => data.releases.find((r) => r.release === state.release)!;
  const nodeMap = () => new Map(current().snapshot.nodes.map((n) => [n.id, n] as const));

  function syncUrl() {
    const url = new URL(location.href);
    url.searchParams.set('release', String(state.release));
    if (state.view === 'portfolio') url.searchParams.set('view', 'portfolio');
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
  }

  // Release picker: published releases are buttons; upcoming ones are shown
  // disabled so visitors can see the series is growing.
  function buildReleases() {
    ui.releases.replaceChildren();
    for (const r of data.releases) {
      const b = el('button');
      b.type = 'button';
      b.append(el('span', 'vg-rel-num', String(r.release)), document.createTextNode(r.title));
      b.setAttribute('aria-pressed', String(r.release === state.release));
      b.addEventListener('click', () => {
        if (state.release === r.release) return;
        state.release = r.release;
        state.question = 0;
        state.selected = null;
        build();
      });
      ui.releases.append(b);
    }
    for (const r of data.upcoming) {
      const b = el('button');
      b.type = 'button';
      b.disabled = true;
      b.append(el('span', 'vg-rel-num', String(r.release)), document.createTextNode(`${r.title} · coming next`));
      ui.releases.append(b);
    }
  }

  // Rebuild questions and cards when the release or view changes.
  function build() {
    const { snapshot, questions } = current();
    const viewData = questions.views[state.view];
    const asOf = formatDate(snapshot.asOf);

    ui.asOf.textContent = `${snapshot.fictional ? 'Demo data, fictional' : 'Data'}, as of ${asOf}.`;
    ui.answerFine.textContent = `${snapshot.fictional ? 'Demo data, fictional' : 'Data'}, as of ${asOf}. Release ${snapshot.release}.`;
    ui.graphTitle.textContent = `Value Graph · ${snapshot.graphName}`;
    ui.note.textContent = viewData.note;
    ui.foot.textContent = snapshot.footNotes[state.view];
    ui.viewButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.vgView === state.view)));
    buildReleases();

    questionButtons = viewData.questions.map((q, i) => {
      const b = el('button', undefined, q.text);
      b.type = 'button';
      b.addEventListener('click', () => {
        state.question = i;
        state.selected = null;
        update();
      });
      return b;
    });
    ui.questions.replaceChildren(...questionButtons);

    cardButtons = new Map();
    const columns = snapshot.lenses.map((lens) => {
      const col = el('div', 'vg-lens');
      const heading = lens === 'Investment' && state.view === 'portfolio' ? 'Investment · by skill' : lens;
      col.append(el('h3', undefined, heading));
      const list = el('div', 'vg-cards');
      for (const n of snapshot.nodes.filter((n) => n.lens === lens && isVisible(n, state.view))) {
        list.append(cardFor(n, snapshot.release));
      }
      col.append(list);
      return col;
    });
    ui.lenses.replaceChildren(...columns);

    syncUrl();
    update();
  }

  function cardFor(n: GraphNode, release: number) {
    const b = el('button', 'vg-card');
    b.type = 'button';
    if (n.gap) b.classList.add('is-gap');
    if (release > 0 && n.addedIn === release) b.append(el('span', 'vg-card__new', 'New in this release'));
    b.append(el('span', 'vg-card__t', n.title), el('span', 'vg-card__s', n.subtitle));
    b.addEventListener('click', () => {
      if (state.selected === n.id) {
        state.selected = null;
        state.question = 0;
      } else {
        state.selected = n.id;
        state.question = null;
      }
      update();
    });
    cardButtons.set(n.id, b);
    return b;
  }

  // Apply highlight, answer and trace state without rebuilding the DOM,
  // so keyboard focus stays where it is.
  function update() {
    const { snapshot, questions } = current();
    const viewData = questions.views[state.view];
    const nodes = nodeMap();

    let highlight: Set<string> | null = null;
    if (state.selected) {
      highlight = traceFrom(state.selected, nodes, snapshot.edges, state.view);
      ui.traceTitle.textContent = nodes.get(state.selected)?.title ?? '';
      ui.traceText.textContent = `${highlight.size - 1} connected cards across the lenses. Click the card again to clear.`;
    } else if (state.question !== null) {
      highlight = new Set(viewData.questions[state.question].highlight);
    }
    ui.trace.hidden = !state.selected;

    const q = state.question !== null && !state.selected ? viewData.questions[state.question] : null;
    ui.answer.hidden = !q;
    if (q) {
      ui.answerText.textContent = q.answer.text;
      ui.answerBasis.textContent = q.answer.basis;
      ui.answerGaps.textContent = q.answer.gaps;
    }
    questionButtons.forEach((b, i) => b.setAttribute('aria-pressed', String(q !== null && state.question === i)));

    for (const [id, b] of cardButtons) {
      const on = highlight?.has(id) ?? false;
      b.classList.toggle('is-on', on);
      b.classList.toggle('is-dim', !!highlight && !on);
      b.setAttribute('aria-pressed', String(state.selected === id));
    }
  }

  ui.viewButtons.forEach((b) =>
    b.addEventListener('click', () => {
      const view = b.dataset.vgView as ViewKey;
      if (!VIEWS.includes(view) || view === state.view) return;
      state.view = view;
      state.question = 0;
      state.selected = null;
      build();
    }),
  );
  ui.traceClear.addEventListener('click', () => {
    const id = state.selected;
    state.selected = null;
    state.question = 0;
    update();
    if (id) cardButtons.get(id)?.focus();
  });

  build();
}
