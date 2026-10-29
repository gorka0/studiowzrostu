import fs from 'fs';

const glob = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = dir + '/' + file;
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(glob(full));
    } else if (file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
};

const files = glob('.');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if ((l.includes('<Link') || l.includes('<a')) && (l.includes('text-accent-text') || l.includes('text-primary'))) {
      if (!l.includes('underline') && !l.includes('Button') && !l.includes('rounded-full') && !l.includes('rounded-xl') && !l.includes('h-') && !l.includes('px-')) {
        console.log(`${f}:${idx + 1}: ${l.trim()}`);
      }
    }
  });
}
