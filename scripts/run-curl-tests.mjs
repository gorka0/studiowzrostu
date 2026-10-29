import crypto from "crypto";
import { execSync } from "child_process";
import fs from "fs";

// Odczytaj CONTACT_SECRET z .env.local jeśli istnieje
let secret = "studio-wzrostu-dev-test-secret";
if (fs.existsSync(".env.local")) {
  const content = fs.readFileSync(".env.local", "utf-8");
  const match = content.match(/CONTACT_SECRET=["']?(.*?)["']?$/m);
  if (match && match[1]) {
    secret = match[1].trim();
  }
}

function genToken(offsetMs = 0) {
  const ts = Date.now() + offsetMs;
  const hmac = crypto.createHmac("sha256", secret).update(ts.toString()).digest("hex");
  return `${ts}.${hmac}`;
}

const validToken = genToken(-10000); // 10s temu
const fastToken = genToken(0); // dosłownie teraz

console.log("==================================================");
console.log(" TESTY CURL DLA /api/contact");
console.log("==================================================\n");

function runCurl(label, body, customHeaders = "") {
  console.log(`--- [TEST: ${label}] ---`);
  const jsonStr = JSON.stringify(body).replace(/"/g, '\\"');
  const cmd = `curl.exe -i -s -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" ${customHeaders} -d "${jsonStr}"`;
  try {
    const res = execSync(cmd, { encoding: "utf-8" });
    const statusLine = res.split("\r\n")[0] || res.split("\n")[0];
    const bodyIndex = res.indexOf("\r\n\r\n");
    const resBody = bodyIndex !== -1 ? res.slice(bodyIndex + 4) : res;
    console.log(`Status: ${statusLine}`);
    console.log(`Odpowiedź: ${resBody.trim()}`);
  } catch (err) {
    console.error(`Błąd: ${err.message}`);
  }
  console.log("");
}

// 1. Poprawny formularz
runCurl(
  "1. POPRAWNE DANE (oczekiwane 200 OK)",
  {
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    phone: "+48 500 600 700",
    projectType: "nowa-strona",
    budget: "5k-10k",
    message: "Dzień dobry, potrzebuję nowoczesnej strony internetowej dla firmy.",
    consent: true,
    honeypot: "",
    timeToken: validToken,
  },
  '-H "X-Forwarded-For: 198.51.100.1"'
);

// 2. Błędne dane (brak imienia, zły email, brak zgody)
runCurl(
  "2. BŁĘDNE DANE (oczekiwane 400 Bad Request)",
  {
    name: "J",
    email: "to-nie-jest-email",
    projectType: "nieistniejacy-typ",
    message: "Krótko",
    consent: false,
    timeToken: validToken,
  },
  '-H "X-Forwarded-For: 198.51.100.2"'
);

// 3. Honeypot wypełniony
runCurl(
  "3. HONEYPOT WYPEŁNIONY (oczekiwane 400 Bad Request)",
  {
    name: "Spambot",
    email: "bot@spam.com",
    projectType: "nowa-strona",
    message: "Spam message buy our crypto immediately",
    consent: true,
    honeypot: "https://spamlink.com",
    timeToken: validToken,
  },
  '-H "X-Forwarded-For: 198.51.100.3"'
);

// 4. Za szybka wysyłka (< 3s)
runCurl(
  "4. ZA SZYBKA WYSYŁKA (oczekiwane 400 Bad Request - TOO_FAST)",
  {
    name: "Szybki Użytkownik",
    email: "szybki@example.com",
    projectType: "nowa-strona",
    message: "Wypełniłem formularz w ułamku sekundy automatycznie.",
    consent: true,
    honeypot: "",
    timeToken: fastToken,
  },
  '-H "X-Forwarded-For: 198.51.100.4"'
);

// 5. Przekroczony rate limit (5 requestów z tego samego IP)
console.log("--- [TEST: 5. RATE LIMIT - seria 6 zapytań z IP 198.51.100.50] ---");
const rateLimitIp = "198.51.100.50";
for (let i = 1; i <= 6; i++) {
  const token = genToken(-5000);
  const jsonStr = JSON.stringify({
    name: `Test ${i}`,
    email: `test${i}@example.com`,
    projectType: "nowa-strona",
    message: `Testowa wiadomość rate limit numer ${i}`,
    consent: true,
    honeypot: "",
    timeToken: token,
  }).replace(/"/g, '\\"');
  
  const cmd = `curl.exe -i -s -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -H "X-Forwarded-For: ${rateLimitIp}" -d "${jsonStr}"`;
  const res = execSync(cmd, { encoding: "utf-8" });
  const statusLine = res.split("\r\n")[0] || res.split("\n")[0];
  console.log(`Próba ${i}/6 -> Status: ${statusLine}`);
  if (i === 6) {
    const bodyIndex = res.indexOf("\r\n\r\n");
    console.log(`Odpowiedź przy próbie 6: ${res.slice(bodyIndex + 4).trim()}`);
  }
}

console.log("\n==================================================");
