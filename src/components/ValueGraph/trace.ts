// Pure graph logic for the demo, kept free of the DOM so it is easy to test.
import type { GraphEdge, GraphNode, ViewKey } from '../../lib/demo-data';

/** A node shows in a view when it belongs to no view (shared) or to that view. */
export const isVisible = (node: GraphNode, view: ViewKey) => !node.view || node.view === view;

/**
 * Everything connected to `start`: all visible nodes reachable forwards
 * (towards Strategic) and backwards (towards Investment). Customer and User
 * cards that hang off any of those are added too, so a trace always shows
 * who the value is for.
 */
export function traceFrom(
  start: string,
  nodes: Map<string, GraphNode>,
  edges: GraphEdge[],
  view: ViewKey,
): Set<string> {
  const walk = (forward: boolean) => {
    const seen = new Set([start]);
    const stack = [start];
    while (stack.length) {
      const current = stack.pop()!;
      for (const e of edges) {
        const [from, to] = forward ? [e.from, e.to] : [e.to, e.from];
        const target = nodes.get(to);
        if (from === current && target && isVisible(target, view) && !seen.has(to)) {
          seen.add(to);
          stack.push(to);
        }
      }
    }
    return seen;
  };

  const result = new Set([...walk(true), ...walk(false)]);
  for (const id of [...result]) {
    for (const e of edges) {
      const target = nodes.get(e.to);
      if (e.from === id && target && (target.lens === 'Customer' || target.lens === 'User')) result.add(e.to);
    }
  }
  return result;
}
