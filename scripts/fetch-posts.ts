import { config } from 'dotenv';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@sanity/client';

config({ path: resolve(process.cwd(), '.env') });

const client = createClient({
  projectId: process.env['SANITY_PROJECT_ID']!,
  dataset: process.env['SANITY_DATASET'] ?? 'production',
  apiVersion: process.env['SANITY_API_VERSION']!,
  useCdn: false,
});

(async () => {
  const posts = await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { _id, title, slug, publishedAt, imageUrl, body }`
  );
  const outDir = resolve(process.cwd(), 'src/data');
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log(`Fetched ${posts.length} posts → src/data/posts.json`);
})();
