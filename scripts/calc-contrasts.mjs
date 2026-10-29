function getLuminance(hex) {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const colors = {
  // Light theme
  lightBg: '#FBFAF6',
  lightCard: '#FFFFFF',
  lightSecondary: '#F2EFE8',
  lightBorder: '#E5E0D5',
  lightInk: '#14231C',
  lightInkMuted: '#3F5046',
  lightAccent: '#188755',
  lightAccentText: '#136B43',
  lightCoral: '#D94E14',
  lightCoralText: '#B83E0A',
  white: '#FFFFFF',

  // Dark theme
  darkBg: '#0B1410',
  darkCard: '#121E18',
  darkSecondary: '#182A22',
  darkBorder: '#1F3329',
  darkInk: '#EDF5F1',
  darkInkMuted: '#90A69A',
  darkMintGraphic: '#2ECC71',
  darkMintText: '#4ADE9C',
  darkCoralGraphic: '#FF7A45',
  darkCoralText: '#FF8F5E',
  darkFg: '#0B1410',
};

console.log('=== LIGHT THEME CONTRASTS ===');
console.log('1. lightAccent (#188755) on lightBg (#FBFAF6) [Graphic, req 3.0:1]:', getContrast(colors.lightAccent, colors.lightBg).toFixed(2));
console.log('2. lightAccent (#188755) on lightCard (#FFFFFF) [Graphic, req 3.0:1]:', getContrast(colors.lightAccent, colors.lightCard).toFixed(2));
console.log('3. White (#FFFFFF) on lightAccent (#188755) [Button text, req 4.5:1]:', getContrast(colors.white, colors.lightAccent).toFixed(2));
console.log('4. White (#FFFFFF) on lightAccentText (#136B43) [Button text, req 4.5:1]:', getContrast(colors.white, colors.lightAccentText).toFixed(2));
console.log('5. lightAccentText (#136B43) on lightBg (#FBFAF6) [Text, req 4.5:1]:', getContrast(colors.lightAccentText, colors.lightBg).toFixed(2));
console.log('6. lightAccentText (#136B43) on lightCard (#FFFFFF) [Text, req 4.5:1]:', getContrast(colors.lightAccentText, colors.lightCard).toFixed(2));
console.log('7. lightAccentText (#136B43) on lightSecondary (#F2EFE8) [Text, req 4.5:1]:', getContrast(colors.lightAccentText, colors.lightSecondary).toFixed(2));
console.log('8. lightInk (#14231C) on lightBg (#FBFAF6) [Text, req 4.5:1]:', getContrast(colors.lightInk, colors.lightBg).toFixed(2));
console.log('9. lightInkMuted (#3F5046) on lightBg (#FBFAF6) [Text, req 4.5:1]:', getContrast(colors.lightInkMuted, colors.lightBg).toFixed(2));
console.log('10. lightCoralGraphic (#D94E14) on lightBg (#FBFAF6) [Graphic, req 3.0:1]:', getContrast(colors.lightCoral, colors.lightBg).toFixed(2));
console.log('11. lightCoralText (#B83E0A) on lightBg (#FBFAF6) [Text, req 4.5:1]:', getContrast(colors.lightCoralText, colors.lightBg).toFixed(2));

console.log('\n=== DARK THEME CONTRASTS ===');
console.log('1. darkMintGraphic (#2ECC71) on darkBg (#0B1410) [Graphic, req 3.0:1]:', getContrast(colors.darkMintGraphic, colors.darkBg).toFixed(2));
console.log('2. darkMintGraphic (#2ECC71) on darkCard (#121E18) [Graphic, req 3.0:1]:', getContrast(colors.darkMintGraphic, colors.darkCard).toFixed(2));
console.log('3. darkMintText (#4ADE9C) on darkBg (#0B1410) [Text, req 4.5:1]:', getContrast(colors.darkMintText, colors.darkBg).toFixed(2));
console.log('4. darkMintText (#4ADE9C) on darkCard (#121E18) [Text, req 4.5:1]:', getContrast(colors.darkMintText, colors.darkCard).toFixed(2));
console.log('5. darkFg (#0B1410) on darkMintText (#4ADE9C) [Button text, req 4.5:1]:', getContrast(colors.darkFg, colors.darkMintText).toFixed(2));
console.log('6. darkCoralGraphic (#FF7A45) on darkBg (#0B1410) [Graphic, req 3.0:1]:', getContrast(colors.darkCoralGraphic, colors.darkBg).toFixed(2));
console.log('7. darkCoralGraphic (#FF7A45) on darkCard (#121E18) [Graphic, req 3.0:1]:', getContrast(colors.darkCoralGraphic, colors.darkCard).toFixed(2));
console.log('8. darkCoralText (#FF8F5E) on darkBg (#0B1410) [Text, req 4.5:1]:', getContrast(colors.darkCoralText, colors.darkBg).toFixed(2));
console.log('9. darkCoralText (#FF8F5E) on darkCard (#121E18) [Text, req 4.5:1]:', getContrast(colors.darkCoralText, colors.darkCard).toFixed(2));
console.log('10. darkInk (#EDF5F1) on darkBg (#0B1410) [Text, req 4.5:1]:', getContrast(colors.darkInk, colors.darkBg).toFixed(2));
console.log('11. darkInkMuted (#90A69A) on darkBg (#0B1410) [Text, req 4.5:1]:', getContrast(colors.darkInkMuted, colors.darkBg).toFixed(2));
