// TrueTag — Black Friday Deal Finder: the hand-in program for
// black-friday-deal-finder-01 (Node 22, standard library only).
//
// The site is this directory's app/ folder: plain static files a browser
// opens at app/index.html, its deals held in app/deals-data.js. Nothing the
// site runs, styles or shows loads over the network; each deal links out to
// its store, and a store link is a link, not a load.
//
// This program hands the site in: before writing anything it runs a
// preflight (screenshot count and sizes, the app/ file and byte caps, and
// every deal's required fields) and exits nonzero on any problem; then it
// copies app/ and screenshots/ from beside this file to /output and writes
// /output/dossier.json with buildDossier from vendor/makefun-frontend.ts,
// exactly as the kit's starter does. vendor/makefun-frontend.ts is the kit's copy, unchanged —
// the scorer rebuilds the dossier with its own copy and compares byte for
// byte, so the library must not be edited.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program writes only under the output directory, reads no clock and
// no network, and two runs from the same repository write identical bytes.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps, named once: the preflight below refuses anything the
// scorer would refuse, and buildDossier is called with the same numbers.
const CAPS = {
  text_max_bytes: 163840,
  screenshots_max: 4,
  screenshot_max_bytes: 262144,
  app_max_files: 993,
  app_max_bytes: 16777216,
};

// Preflight: check the hand-in against the caps and the deal board's own
// contract before a single output byte is written. Every problem found is
// printed, and any problem at all exits nonzero — a broken entry must fail
// here, in the maker's hands, not at the scorer's gate.
function preflight() {
  const problems = [];

  const shotsDir = join(here, 'screenshots');
  if (existsSync(shotsDir)) {
    const shots = readdirSync(shotsDir).filter((name) => statSync(join(shotsDir, name)).isFile());
    if (shots.length > CAPS.screenshots_max) {
      problems.push(`screenshots/: ${shots.length} files, over the cap of ${CAPS.screenshots_max}`);
    }
    for (const name of shots) {
      const bytes = statSync(join(shotsDir, name)).size;
      if (bytes > CAPS.screenshot_max_bytes) {
        problems.push(`screenshots/${name}: ${bytes} bytes, over the cap of ${CAPS.screenshot_max_bytes}`);
      }
    }
  }

  let appEntries = 0;
  let appBytes = 0;
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      appEntries += 1;
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.isFile()) appBytes += statSync(path).size;
    }
  };
  walk(join(here, 'app'));
  if (appEntries > CAPS.app_max_files) {
    problems.push(`app/: ${appEntries} files and directories, over the cap of ${CAPS.app_max_files}`);
  }
  if (appBytes > CAPS.app_max_bytes) {
    problems.push(`app/: ${appBytes} bytes of files, over the cap of ${CAPS.app_max_bytes}`);
  }

  // The board's data file is a browser script that fills window.DEALS;
  // run it against an empty window and check every deal carries the fields
  // a shopper (and the finalist review) needs: product, store, sale price,
  // usual price, store link and source. Since the Nov 28 recheck, every
  // deal must also carry an evidence link — dated, independent coverage of
  // the same price — so a card can never ship with an unsupported price.
  const windowShim = {};
  runInNewContext(readFileSync(join(here, 'app', 'deals-data.js'), 'utf8'), { window: windowShim });
  const deals = windowShim.DEALS;
  if (!Array.isArray(deals) || deals.length === 0) {
    problems.push('app/deals-data.js: window.DEALS is missing or empty');
  } else {
    deals.forEach((deal, i) => {
      if (!deal || typeof deal !== 'object') {
        problems.push(`deal ${i + 1}: not an object`);
        return;
      }
      const label = typeof deal.id === 'string' && deal.id ? deal.id : `deal ${i + 1}`;
      for (const field of ['product', 'store', 'source']) {
        if (typeof deal[field] !== 'string' || deal[field].trim() === '') {
          problems.push(`deal ${label}: ${field} is missing or empty`);
        }
      }
      if (typeof deal.url !== 'string' || !deal.url.startsWith('https://')) {
        problems.push(`deal ${label}: url is missing or not an https link`);
      }
      const evidence = deal.evidence;
      if (!evidence || typeof evidence !== 'object' || typeof evidence.label !== 'string' || evidence.label.trim() === '') {
        problems.push(`deal ${label}: evidence label is missing or empty`);
      } else if (typeof evidence.url !== 'string' || !evidence.url.startsWith('https://')) {
        problems.push(`deal ${label}: evidence url is missing or not an https link`);
      }
      for (const field of ['price', 'usual']) {
        if (typeof deal[field] !== 'number' || !Number.isFinite(deal[field]) || deal[field] <= 0) {
          problems.push(`deal ${label}: ${field} is missing or not a positive number`);
        }
      }
    });
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`preflight: ${problem}`);
    console.error(`preflight: ${problems.length} problem(s); nothing was written`);
    process.exit(1);
  }
}

preflight();

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// text_max_bytes shapes the dossier text; the rest are the same caps the
// preflight has already enforced, passed on so the dossier is built under
// exactly the limits the entry was checked against.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: CAPS.text_max_bytes, screenshots: { max: CAPS.screenshots_max, max_bytes: CAPS.screenshot_max_bytes }, app_max_files: CAPS.app_max_files, app_max_bytes: CAPS.app_max_bytes }),
);
