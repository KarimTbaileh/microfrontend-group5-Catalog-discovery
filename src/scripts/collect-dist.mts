import { cpSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const src = join(root, 'dist-mfe');
const dest = join(root, 'dist', 'mfe');

if (!existsSync(src)) {
    console.error('dist-mfe/ not found — run vite build --mode mfe first');
    process.exit(1);
}

mkdirSync(dest, { recursive: true });
rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

console.log('Copied dist-mfe/ → dist/mfe/');