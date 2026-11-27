// Capture the four entry screenshots with headless Chrome (puppeteer-core),
// serving app/ with a tiny static server. Also smoke-tests the controls and
// fails loudly on any page error, so the screenshots are known-good renders
// of the site's own code.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from '/home/hatch/workspace/projects/makefun-flight-game/tools/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');
const appDir = join(repo, 'app');
const chrome = '/home/hatch/workspace/projects/makefun-flight-game/tools/browsers/chrome-headless-shell/linux-158.0.8127.88/chrome-headless-shell-linux64/chrome-headless-shell';
const PORT = 8923;

const MIME = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json' };
const server = createServer(async (req, res) => {
  try {
    const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
    const file = join(appDir, path);
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(PORT, r));

const browser = await puppeteer.launch({
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1', '--hide-scrollbars'],
});
const errors = [];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(name, width, height, prepare) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(name + ' pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(name + ' console: ' + m.text()); });
  await page.setViewport({ width, height });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction('document.querySelectorAll("#grid .card").length > 0', { timeout: 30000 });
  if (prepare) await prepare(page);
  await wait(300);
  const path = join(repo, 'screenshots', name);
  await page.screenshot({ path, type: 'jpeg', quality: 80 });
  const bytes = statSync(path).size;
  console.log('captured', name, width + 'x' + height, bytes, 'bytes', bytes <= 262144 ? 'OK' : 'OVER 256KiB!');
  await page.close();
}

await shot('1-board.jpg', 1280, 800, null);

await shot('2-filter-tvs.jpg', 1280, 800, async (page) => {
  await page.click('.chip[data-cat="TVs"]');
  await page.select('#discSel', '50');
  await page.waitForFunction('document.querySelectorAll("#grid .card").length === 3', { timeout: 10000 });
});

await shot('3-search-beats.jpg', 1280, 800, async (page) => {
  await page.type('#search', 'beats');
  await page.waitForFunction('document.querySelectorAll("#grid .card").length === 2', { timeout: 10000 });
});

await shot('4-phone.jpg', 390, 844, null);

// Smoke: store filter + sort, read back the count line.
{
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push('smoke pageerror: ' + e.message));
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForFunction('document.querySelectorAll("#grid .card").length === 12', { timeout: 30000 });
  await page.select('#storeSel', 'Walmart');
  await page.waitForFunction('document.querySelectorAll("#grid .card").length === 3', { timeout: 10000 });
  const count = await page.$eval('#count', (el) => el.textContent);
  console.log('smoke store=Walmart ->', count);
  await page.select('#sortSel', 'priceLow');
  const first = await page.$eval('#grid .card .price', (el) => el.textContent);
  console.log('smoke sort=priceLow first price ->', first);
  await page.close();
}

await browser.close();
server.close();
if (errors.length) {
  console.error('PAGE ERRORS:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('no page errors');
