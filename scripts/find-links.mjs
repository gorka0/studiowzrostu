import fs from 'fs';

const glob = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = dir + '/' + file;
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
      results = results.concat(glob(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(full);
    }
  });
  return results;
};

const files = glob('.');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if ((line.includes('<Link') || line.includes('<a')) && !line.includes('button') && !line.includes('Button')) {
      // Check if it's within prose or has underline
      if (!line.includes('underline') && !line.includes('rounded') && !line.includes('group') && !line.includes('header') && !line.includes('footer')) {
        console.log(`${f}:${i + 1}: ${line.trim()}`);
      }
    }
  });
}
