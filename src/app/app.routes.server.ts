import { RenderMode, ServerRoute } from '@angular/ssr';
import posts from '../data/posts.json';

export const serverRoutes: ServerRoute[] = [
  { path: '',          renderMode: RenderMode.Prerender },
  { path: 'o-nas',     renderMode: RenderMode.Prerender },
  { path: 'projekty',  renderMode: RenderMode.Prerender },
  { path: 'kontakt',   renderMode: RenderMode.Prerender },
  {
    path: 'posts/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () =>
      (posts as { slug: { current: string } }[]).map(p => ({ slug: p.slug.current })),
  },
];
