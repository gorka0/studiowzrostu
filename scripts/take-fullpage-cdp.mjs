import fs from "fs";
import path from "path";
import { spawn } from "child_process";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9225;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runCdpCommand(ws, method, params = {}, id = 1) {
  return new Promise((resolve, reject) => {
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener("message", handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function captureVariant({ name, width, height, darkMode, reducedMotion, noJs, outPath }) {
  console.log(`Starting capture: ${name}`);
  const userDataDir = path.join(process.cwd(), ".tmp-chrome-profile-" + Date.now());
  fs.mkdirSync(userDataDir, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank"
  ]);

  await wait(1500);

  try {
    const resp = await fetch(`http://127.0.0.1:${PORT}/json/version`);
    const ver = await resp.json();
    const wsUrl = ver.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    let msgId = 1;
    const send = (m, p) => runCdpCommand(ws, m, p, msgId++);

    // Create target
    const target = await send("Target.createTarget", { url: "about:blank" });
    const targetWsUrl = `ws://127.0.0.1:${PORT}/devtools/page/${target.targetId}`;

    const pageWs = new WebSocket(targetWsUrl);
    await new Promise((resolve) => {
      pageWs.onopen = resolve;
    });

    let pageMsgId = 1;
    const pageSend = (m, p) => runCdpCommand(pageWs, m, p, pageMsgId++);

    await pageSend("Page.enable");
    await pageSend("DOM.enable");

    // Set viewport
    await pageSend("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    const mediaFeatures = [];
    if (darkMode) {
      mediaFeatures.push({ name: "prefers-color-scheme", value: "dark" });
    } else {
      mediaFeatures.push({ name: "prefers-color-scheme", value: "light" });
    }

    if (reducedMotion) {
      mediaFeatures.push({ name: "prefers-reduced-motion", value: "reduce" });
    }

    if (mediaFeatures.length > 0) {
      await pageSend("Emulation.setEmulatedMedia", {
        media: "screen",
        features: mediaFeatures,
      });
    }

    if (noJs) {
      await pageSend("Emulation.setScriptExecutionDisabled", { value: true });
    }

    // Navigate to homepage
    await pageSend("Page.navigate", { url: "http://localhost:3000" });

    // Wait for load
    await wait(2500);

    // If dark mode and JS is enabled, also ensure html has class dark
    if (darkMode && !noJs) {
      await pageSend("Runtime.evaluate", {
        expression: "document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light');",
      });
      await wait(300);
    }

    // Capture screenshot beyond viewport (full page)
    const shot = await pageSend("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      fromSurface: true,
    });

    fs.writeFileSync(outPath, Buffer.from(shot.data, "base64"));
    const stats = fs.statSync(outPath);
    console.log(`✓ Saved ${name}: ${outPath} (${(stats.size / 1024).toFixed(1)} KB)`);

    ws.close();
    pageWs.close();
  } finally {
    chromeProc.kill();
    await wait(500);
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  }
}

async function main() {
  const outDir = path.join(process.cwd(), "screenshots/fullpage");
  fs.mkdirSync(outDir, { recursive: true });

  const tasks = [
    { name: "375px-light", width: 375, height: 800, darkMode: false, outPath: path.join(outDir, "fullpage-375px-light.png") },
    { name: "375px-dark", width: 375, height: 800, darkMode: true, outPath: path.join(outDir, "fullpage-375px-dark.png") },
    { name: "1440px-light", width: 1440, height: 900, darkMode: false, outPath: path.join(outDir, "fullpage-1440px-light.png") },
    { name: "1440px-dark", width: 1440, height: 900, darkMode: true, outPath: path.join(outDir, "fullpage-1440px-dark.png") },
    { name: "1440px-no-js", width: 1440, height: 900, noJs: true, outPath: path.join(outDir, "fullpage-1440px-no-js.png") },
    { name: "1440px-reduced-motion", width: 1440, height: 900, reducedMotion: true, outPath: path.join(outDir, "fullpage-1440px-reduced-motion.png") },
  ];

  for (const t of tasks) {
    try {
      await captureVariant(t);
    } catch (err) {
      console.error(`Error capturing ${t.name}:`, err);
    }
  }
}

main();
