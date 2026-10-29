import fs from 'fs';
import path from 'path';

const ROOT = 'd:/home/strony/studiowzrostu';

const glob = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(glob(full));
    } else if (file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
};

const files = glob(path.join(ROOT, 'app'));
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('text-primary') && !l.includes('text-primary-foreground')) {
      console.log(`${path.relative(ROOT, f)}:${idx + 1}: ${l.trim()}`);
    }
  });
}
