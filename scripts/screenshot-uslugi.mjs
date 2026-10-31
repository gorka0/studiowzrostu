import fs from "fs";
import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9230;

async function main() {
  const p = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "about:blank",
  ]);

  await new Promise((r) => setTimeout(r, 1500));
  const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
  const { webSocketDebuggerUrl } = await res.json();
  const ws = new WebSocket(webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const curId = id++;
      const h = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === curId) {
          ws.removeEventListener("message", h);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      ws.addEventListener("message", h);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });

  const t = await send("Target.createTarget", { url: "about:blank" });
  const pageWs = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${t.targetId}`);
  await new Promise((r) => (pageWs.onopen = r));

  let pageId = 1;
  const pageSend = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const curId = pageId++;
      const h = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === curId) {
          pageWs.removeEventListener("message", h);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
      pageWs.addEventListener("message", h);
      pageWs.send(JSON.stringify({ id: curId, method, params }));
    });

  await pageSend("Page.enable");
  await pageSend("DOM.enable");
  await pageSend("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await pageSend("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((r) => setTimeout(r, 2500));

  await pageSend("Runtime.evaluate", {
    expression: "document.querySelector('#uslugi').scrollIntoView({ behavior: 'instant', block: 'start' });",
  });
  await new Promise((r) => setTimeout(r, 1000));

  const shot = await pageSend("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync("screenshots/uslugi-scrolled-viewport.png", Buffer.from(shot.data, "base64"));
  console.log("Saved screenshots/uslugi-scrolled-viewport.png, size:", fs.statSync("screenshots/uslugi-scrolled-viewport.png").size);

  ws.close();
  pageWs.close();
  p.kill();
}

main();
