const res = await fetch('http://localhost:3000');
const html = await res.text();
const matches = html.match(/<link[^>]+>/g) || [];
console.log('Link tags:');
matches.forEach(m => console.log(m));
