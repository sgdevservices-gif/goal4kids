import { writeFileSync, readFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = 'https://goal4kids.pl';

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/o-nas', priority: '0.8', changefreq: 'monthly' },
  { path: '/projekty', priority: '0.9', changefreq: 'weekly' },
  { path: '/kontakt', priority: '0.7', changefreq: 'monthly' },
];

interface Post {
  slug: { current: string };
  publishedAt: string;
}

const postsPath = resolve(process.cwd(), 'src/data/posts.json');
const posts: Post[] = JSON.parse(readFileSync(postsPath, 'utf-8'));

const postEntries = posts.map(post => ({
  path: `/posts/${post.slug.current}`,
  lastmod: post.publishedAt ? post.publishedAt.split('T')[0] : undefined,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allRoutes = [...staticRoutes, ...postEntries];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    const lastmod = ('lastmod' in route && route.lastmod) ? route.lastmod : today;
    return `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), xml);
console.log(`Sitemap generated with ${allRoutes.length} URLs → public/sitemap.xml`);
