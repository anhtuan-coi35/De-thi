import fs from 'fs';
const lines = fs.readFileSync('data/curriculum.ts', 'utf8').split('\n');
// We want to keep up to line 282 (index 281).
// Then add `      },`
// Then keep from line 322 (index 321) onwards.
const newLines = [
  ...lines.slice(0, 282),
  '      },',
  ...lines.slice(321)
];
fs.writeFileSync('data/curriculum.ts', newLines.join('\n'));
