// TrueTag — Black Friday Deal Finder: the hand-in program for
// black-friday-deal-finder-01 (Node 22, standard library only).
//
// The site is this directory's app/ folder: plain static files a browser
// opens at app/index.html, its deals held in app/deals-data.js. Nothing the
// site runs, styles or shows loads over the network; each deal links out to
// its store, and a store link is a link, not a load.
//
// This program hands the site in: it copies app/ and screenshots/ from
// beside this file to /output and writes /output/dossier.json with
// buildDossier from vendor/makefun-frontend.ts, exactly as the kit's
// starter does. vendor/makefun-frontend.ts is the kit's copy, unchanged —
// the scorer rebuilds the dossier with its own copy and compares byte for
// byte, so the library must not be edited.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// The program writes only under the output directory, reads no clock and
// no network, and two runs from the same repository write identical bytes.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (competition gate): text_max_bytes shapes the
// dossier text; the others refuse an entry the scorer would refuse (more
// than 4 screenshots or one over 256 KiB; more than 993 files and
// directories in app/ or 16 MiB of app files).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
