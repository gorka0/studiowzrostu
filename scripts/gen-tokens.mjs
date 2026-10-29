import { generateTimeToken } from "./lib/antispam.js";

const now = Date.now();
// Token z przeszłości (10 sekund temu - poprawny czas)
const validToken = generateTimeToken(now - 10000);
// Token świeży (zrobiony dosłownie teraz - za szybki)
const fastToken = generateTimeToken(now);

console.log(JSON.stringify({ validToken, fastToken }));
