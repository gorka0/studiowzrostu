async function run() {
  const res = await fetch('http://localhost:3000/projekty');
  const text = await res.text();
  const head = text.split('</head>')[0];
  const links = head.match(/<link[^>]+>/g) || [];
  const imagePreloads = links.filter(l => l.includes('as="image"') || l.includes("as='image'"));
  console.log("Image preloads in <head>:", imagePreloads);
}
run();
