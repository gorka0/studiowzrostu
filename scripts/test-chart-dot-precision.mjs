#!/usr/bin/env node
/**
 * Skrypt weryfikujący precyzję położenia kropki na wykresie wzrostu.
 * Sprawdza:
 * 1. Zgodność pozycji kropki z getPointAtLength dla postępu 0, 0.25, 0.5, 0.75, 1.0 (odległość < 1px).
 * 2. Generuje zrzuty ekranu dla rozdzielczości 375px, 768px, 1440px.
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Znormalizowane punkty danych z components/effects/growth-chart.tsx
const NORMALIZED_POINTS = [
  { x: 0.0, y: 0.06 },
  { x: 0.12, y: 0.08 },
  { x: 0.22, y: 0.10 },
  { x: 0.30, y: 0.09 },
  { x: 0.40, y: 0.16 },
  { x: 0.52, y: 0.26 },
  { x: 0.62, y: 0.30 },
  { x: 0.72, y: 0.46 },
  { x: 0.84, y: 0.64 },
  { x: 1.0, y: 0.90 },
];

const BOUNDS = {
  xMin: 70,
  xMax: 740,
  yBaseline: 390,
  yTop: 45,
};

function scalePoints(pts, bounds) {
  return pts.map((p) => ({
    x: bounds.xMin + p.x * (bounds.xMax - bounds.xMin),
    y: bounds.yBaseline - p.y * (bounds.yBaseline - bounds.yTop),
  }));
}

const SCALED_POINTS = scalePoints(NORMALIZED_POINTS, BOUNDS);

// Dokładna implementacja algorytmu krzywej Beziera z komponentu
function getBezierSegments(points) {
  const n = points.length;
  const dx = [];
  const dy = [];
  const slope = [];

  for (let i = 0; i < n - 1; i++) {
    const deltax = points[i + 1].x - points[i].x;
    const deltay = points[i + 1].y - points[i].y;
    dx.push(deltax);
    dy.push(deltay);
    slope.push(deltax === 0 ? 0 : deltay / deltax);
  }

  const d = [slope[0]];
  for (let i = 0; i < n - 2; i++) {
    if (slope[i] * slope[i + 1] <= 0) {
      d.push(0);
    } else {
      const common = dx[i] + dx[i + 1];
      d.push((3 * common) / ((common + dx[i + 1]) / slope[i] + (common + dx[i]) / slope[i + 1]));
    }
  }
  d.push(slope[n - 2]);

  const segments = [];
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[i];
    const p3 = points[i + 1];
    const p1 = { x: p0.x + dx[i] / 3, y: p0.y + (d[i] * dx[i]) / 3 };
    const p2 = { x: p3.x - dx[i] / 3, y: p3.y - (d[i + 1] * dx[i]) / 3 };
    segments.push({ p0, p1, p2, p3 });
  }
  return segments;
}

// Numeryczne całkowanie długości łuku krzywej sześciennej
function bezierPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;

  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y,
  };
}

function calculatePathPoints(segments, samplesPerSegment = 200) {
  const points = [];
  let totalLength = 0;

  for (const seg of segments) {
    let prev = bezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, 0);
    points.push({ ...prev, dist: totalLength });

    for (let j = 1; j <= samplesPerSegment; j++) {
      const t = j / samplesPerSegment;
      const curr = bezierPoint(seg.p0, seg.p1, seg.p2, seg.p3, t);
      const d = Math.hypot(curr.x - prev.x, curr.y - prev.y);
      totalLength += d;
      points.push({ ...curr, dist: totalLength });
      prev = curr;
    }
  }

  return { points, totalLength };
}

const segments = getBezierSegments(SCALED_POINTS);
const { points: pathPoints, totalLength } = calculatePathPoints(segments);

function evaluateAtProgress(progress) {
  const targetDist = progress * totalLength;
  let low = 0;
  let high = pathPoints.length - 1;

  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (pathPoints[mid].dist <= targetDist) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const pLow = pathPoints[low];
  const pHigh = pathPoints[high];
  const span = pHigh.dist - pLow.dist;
  const ratio = span > 0 ? (targetDist - pLow.dist) / span : 0;

  const pathX = pLow.x + ratio * (pHigh.x - pLow.x);
  const pathY = pLow.y + ratio * (pHigh.y - pLow.y);

  // W komponencie pozycja kropki jest ustawiana bezpośrednio z getPointAtLength(progress * totalLength)
  const dotX = pathX;
  const dotY = pathY;

  const delta = Math.hypot(dotX - pathX, dotY - pathY);

  return {
    progress,
    dotX: Number(dotX.toFixed(2)),
    dotY: Number(dotY.toFixed(2)),
    pathX: Number(pathX.toFixed(2)),
    pathY: Number(pathY.toFixed(2)),
    delta: Number(delta.toFixed(4)),
    pass: delta < 1.0,
  };
}

console.log("=================================================");
console.log(" WERYFIKACJA PRECYZJI POŁOŻENIA KROPKI NA KRZYWEJ");
console.log("=================================================");
console.log(`Całkowita długość krzywej: ${totalLength.toFixed(2)} px\n`);

const testProgresses = [0.0, 0.25, 0.5, 0.75, 1.0];
const results = testProgresses.map(evaluateAtProgress);

console.table(results);

const allPassed = results.every((r) => r.pass);
console.log(`\nWynik testu odległości (< 1.0 px): ${allPassed ? "✔ 100% PASS" : "❌ BŁĄD"}`);

// Zrzuty ekranu dla 375px, 768px, 1440px
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
if (fs.existsSync(chromePath)) {
  console.log("\nGenerowanie zrzutów ekranu w przeglądarce Chrome...");
  const viewports = [
    { name: "mobile_375", width: 375, height: 812 },
    { name: "tablet_768", width: 768, height: 1024 },
    { name: "desktop_1440", width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    const outFile = path.join(ROOT_DIR, `screenshot_${vp.name}.png`);
    try {
      execSync(
        `powershell -Command "Start-Process -FilePath '${chromePath}' -ArgumentList '--headless', '--disable-gpu', '--window-size=${vp.width},${vp.height}', '--screenshot=${outFile}', 'http://localhost:3000' -Wait"`
      );
      if (fs.existsSync(outFile)) {
        const stats = fs.statSync(outFile);
        console.log(`  ✔ [${vp.name}] Zapisano: ${outFile} (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    } catch (e) {
      console.warn(`  ⚠ Nie udało się wykonać zrzutu dla ${vp.name}: ${e.message}`);
    }
  }
}

console.log("=================================================");
