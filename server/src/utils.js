import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function getDataDir() {
  const dataDir = join(__dirname, '..', 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  return dataDir;
}

export function sanitize(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string') {
      out[k] = v.trim().slice(0, 5000);
    } else {
      out[k] = v;
    }
  }
  return out;
}
