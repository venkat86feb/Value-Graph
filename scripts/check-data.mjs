// Checks the release, snapshot and question files before every build,
// so a broken export fails loudly instead of showing wrong numbers.
import { readFileSync, existsSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf8'));
const errors = [];
const fail = (msg) => errors.push(msg);

const { releases } = read('data/releases.json');
for (const r of releases.filter((r) => r.status === 'published')) {
  const tag = `release-${r.release}`;
  for (const p of [`data/snapshots/${tag}.json`, `data/questions/${tag}.json`]) {
    if (!existsSync(new URL(`../${p}`, import.meta.url))) fail(`${tag}: missing ${p}`);
  }
  if (errors.length) continue;

  const snap = read(`data/snapshots/${tag}.json`);
  const qs = read(`data/questions/${tag}.json`);
  if (snap.release !== r.release) fail(`${tag}: snapshot says release ${snap.release}`);
  if (qs.release !== r.release) fail(`${tag}: questions say release ${qs.release}`);

  const ids = new Map(snap.nodes.map((n) => [n.id, n]));
  if (ids.size !== snap.nodes.length) fail(`${tag}: duplicate node ids`);
  for (const n of snap.nodes) {
    if (!snap.lenses.includes(n.lens)) fail(`${tag}: ${n.id} has unknown lens "${n.lens}"`);
  }
  for (const e of snap.edges) {
    if (!ids.has(e.from) || !ids.has(e.to)) fail(`${tag}: edge ${e.from}>${e.to} points to a missing node`);
  }

  // Both Investment groupings must add up to the same hours as Delivery.
  const sum = (list) => list.reduce((t, n) => t + (n.hours ?? 0), 0);
  const inv = (view) => sum(snap.nodes.filter((n) => n.lens === 'Investment' && n.view === view));
  const delivery = sum(snap.nodes.filter((n) => n.lens === 'Delivery'));
  if (inv('value') !== delivery) fail(`${tag}: value-view hours ${inv('value')} ≠ delivery hours ${delivery}`);
  if (inv('portfolio') !== delivery) fail(`${tag}: skill hours ${inv('portfolio')} ≠ delivery hours ${delivery}`);

  // Each investment's outgoing edge hours must match its total, and each
  // delivery item must receive its hours from both groupings.
  for (const n of snap.nodes.filter((n) => n.lens === 'Investment')) {
    const out = snap.edges.filter((e) => e.from === n.id).reduce((t, e) => t + (e.hours ?? 0), 0);
    if (out !== n.hours) fail(`${tag}: ${n.id} has ${n.hours} hours but its links carry ${out}`);
  }
  for (const d of snap.nodes.filter((n) => n.lens === 'Delivery')) {
    for (const view of ['value', 'portfolio']) {
      const inbound = snap.edges
        .filter((e) => e.to === d.id && ids.get(e.from)?.view === view)
        .reduce((t, e) => t + (e.hours ?? 0), 0);
      if (inbound !== d.hours) fail(`${tag}: ${d.id} gets ${inbound} ${view} hours, expected ${d.hours}`);
    }
  }

  for (const [view, v] of Object.entries(qs.views)) {
    for (const q of v.questions) {
      for (const id of q.highlight) {
        const n = ids.get(id);
        if (!n) fail(`${tag}: question "${q.id}" highlights missing node ${id}`);
        else if (n.view && n.view !== view) fail(`${tag}: question "${q.id}" (${view}) highlights ${id} from the ${n.view} view`);
      }
      for (const k of ['text', 'basis', 'gaps']) if (!q.answer?.[k]) fail(`${tag}: question "${q.id}" has no answer.${k}`);
    }
  }
}

if (errors.length) {
  console.error('Demo data check failed:\n- ' + errors.join('\n- '));
  process.exit(1);
}
console.log(`Demo data OK (${releases.filter((r) => r.status === 'published').length} published release(s)).`);
