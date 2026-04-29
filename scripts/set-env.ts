import { config } from 'dotenv';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env') });

const required = ['SANITY_PROJECT_ID', 'SANITY_DATASET', 'SANITY_API_VERSION'];
const missing = required.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const environment = `// Auto-generated from .env — do not edit manually
export const environment = {
  sanity: {
    projectId: '${process.env['SANITY_PROJECT_ID']}',
    dataset: '${process.env['SANITY_DATASET']}',
    apiVersion: '${process.env['SANITY_API_VERSION']}',
    useCdn: true,
  },
};
`;

const outDir = resolve(process.cwd(), 'src/environments');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'environment.ts'), environment);
console.log('Generated src/environments/environment.ts');
