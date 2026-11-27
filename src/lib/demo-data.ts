// Loads every published release's snapshot and scripted questions at build
// time. The demo never calls a live system: what visitors see is exactly
// what is in these files.
import { published } from './releases';

export interface GraphNode {
  id: string;
  lens: string;
  title: string;
  subtitle: string;
  view?: 'value' | 'portfolio';
  gap?: boolean;
  hours?: number;
  addedIn?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  hours?: number;
  kind?: string;
}

export interface Snapshot {
  release: number;
  title: string;
  asOf: string;
  fictional: boolean;
  graphName: string;
  lenses: string[];
  nodes: GraphNode[];
  edges: GraphEdge[];
  footNotes: Record<ViewKey, string>;
}

export type ViewKey = 'value' | 'portfolio';

export interface Question {
  id: string;
  text: string;
  highlight: string[];
  answer: { text: string; basis: string; gaps: string };
}

export interface QuestionSet {
  release: number;
  views: Record<ViewKey, { label: string; note: string; questions: Question[] }>;
}

export interface DemoRelease {
  release: number;
  title: string;
  snapshot: Snapshot;
  questions: QuestionSet;
}

const snapshots = import.meta.glob<Snapshot>('../../data/snapshots/release-*.json', { eager: true, import: 'default' });
const questionSets = import.meta.glob<QuestionSet>('../../data/questions/release-*.json', { eager: true, import: 'default' });

const pick = <T>(files: Record<string, T>, release: number, kind: string): T => {
  const key = Object.keys(files).find((k) => k.endsWith(`/release-${release}.json`));
  if (!key) throw new Error(`Missing ${kind} file for release ${release}`);
  return files[key];
};

export const demoReleases: DemoRelease[] = published.map((r) => ({
  release: r.release,
  title: r.title,
  snapshot: pick(snapshots, r.release, 'snapshot'),
  questions: pick(questionSets, r.release, 'questions'),
}));
