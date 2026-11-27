import releasesFile from '../../data/releases.json';

export interface Release {
  release: number;
  title: string;
  article: string | null;
  status: 'published' | 'upcoming';
}

export const releases = releasesFile.releases as Release[];
export const published = releases.filter((r) => r.status === 'published');
export const upcoming = releases.filter((r) => r.status === 'upcoming');
export const latest = published[published.length - 1];
