import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getDebuggerUrl(port) {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        const data = await res.json();
        return data.webSocketDebuggerUrl;
      }
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Failed to connect to Chrome debug port');
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
    this.eventHandlers = new Map();
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          } else {
            resolve(msg.result);
          }
        } else if (msg.method && this.eventHandlers.has(msg.method)) {
          for (const handler of this.eventHandlers.get(msg.method)) {
            handler(msg.params);
          }
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, handler) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(handler);
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function main() {
  const tempDir = path.join(os.tmpdir(), `chrome_audit_${Date.now()}`);
  const port = 9222;

  console.log('Launching headless Chrome...');
  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${tempDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  const cleanup = () => {
    try {
      chromeProcess.kill();
    } catch {
      // ignore
    }
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore
    }
  };

  process.on('exit', cleanup);
  process.on('SIGINT', cleanup);

  try {
    const browserWsUrl = await getDebuggerUrl(port);
    const browserClient = new CDPClient(browserWsUrl);
    await browserClient.connect();

    // Create a new target page
    const { targetId } = await browserClient.send('Target.createTarget', { url: 'about:blank' });
    const targetWsUrl = `ws://127.0.0.1:${port}/devtools/page/${targetId}`;
    const pageClient = new CDPClient(targetWsUrl);
    await pageClient.connect();

    await pageClient.send('Page.enable');
    await pageClient.send('Runtime.enable');
    await pageClient.send('DOM.enable');

    const consoleLogs = [];
    pageClient.on('Runtime.consoleAPICalled', (params) => {
      const text = params.args.map((a) => a.value || a.description || '').join(' ');
      consoleLogs.push(`[${params.type}] ${text}`);
    });

    console.log(`Navigating to ${URL}...`);
    await pageClient.send('Page.navigate', { url: URL });

    await new Promise((resolve) => {
      pageClient.on('Page.loadEventFired', resolve);
    });

    // Wait 1200ms for React hydration, fonts, and images to settle
    await sleep(1200);

    // --- 1. AUDIT DESKTOP (1440x900) ---
    console.log('Inspecting Desktop viewport (1440x900)...');
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(300);

    const desktopHero = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '01_desktop_hero.png'),
      Buffer.from(desktopHero.data, 'base64')
    );

    // Full page capture desktop
    const desktopLayout = await pageClient.send('Page.getLayoutMetrics');
    const contentHeight = Math.ceil(desktopLayout.contentSize.height);
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: contentHeight,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(400);

    const desktopFull = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '02_desktop_fullpage.png'),
      Buffer.from(desktopFull.data, 'base64')
    );

    // --- 2. AUDIT MOBILE (390x844 iPhone 14 / modern mobile) ---
    console.log('Inspecting Mobile viewport (390x844)...');
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(400);

    const mobileHero = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '03_mobile_hero.png'),
      Buffer.from(mobileHero.data, 'base64')
    );

    const mobileLayout = await pageClient.send('Page.getLayoutMetrics');
    const mobileContentHeight = Math.ceil(mobileLayout.contentSize.height);
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: mobileContentHeight,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(400);

    const mobileFull = await pageClient.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(
      path.join(OUTPUT_DIR, '04_mobile_fullpage.png'),
      Buffer.from(mobileFull.data, 'base64')
    );

    // Reset emulation for metrics inspection
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Run deep in-browser visual inspection
    const evalRes = await pageClient.send('Runtime.evaluate', {
      expression: `(() => {
        const sections = Array.from(document.querySelectorAll('section, main > div, footer')).map(el => {
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          return {
            id: el.id || el.tagName.toLowerCase(),
            top: Math.round(rect.top + window.scrollY),
            height: Math.round(rect.height),
            paddingTop: computed.paddingTop,
            paddingBottom: computed.paddingBottom,
          };
        });

        const overflowElements = Array.from(document.querySelectorAll('*')).filter(el => {
          return el.scrollWidth > document.documentElement.clientWidth + 2;
        }).map(el => ({
          tag: el.tagName,
          id: el.id,
          className: el.className,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
        }));

        const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
          tag: h.tagName,
          text: h.textContent.trim().slice(0, 40),
          fontSize: window.getComputedStyle(h).fontSize,
          lineHeight: window.getComputedStyle(h).lineHeight,
          letterSpacing: window.getComputedStyle(h).letterSpacing,
        }));

        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.getAttribute('src'),
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          clientWidth: img.clientWidth,
          clientHeight: img.clientHeight,
          aspectRatio: img.naturalHeight ? (img.naturalWidth / img.naturalHeight).toFixed(2) : 'none',
        }));

        return {
          sections,
          overflowElements,
          headings,
          images,
          docTitle: document.title,
          totalHeight: document.documentElement.scrollHeight,
          totalWidth: document.documentElement.scrollWidth,
        };
      })()`,
      returnByValue: true,
    });

    const report = {
      timestamp: new Date().toISOString(),
      viewportMetrics: {
        desktopTotalHeight: contentHeight,
        mobileTotalHeight: mobileContentHeight,
      },
      browserMetrics: evalRes.result.value,
      consoleLogs,
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'audit_report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('Visual inspection completed successfully.');
    console.log(`Saved screenshots to: ${OUTPUT_DIR}`);
    console.log(
      `Images verified: ${evalRes.result.value.images.length}, Sections: ${evalRes.result.value.sections.length}`
    );

    pageClient.close();
    browserClient.close();
  } catch (err) {
    console.error('Error during inspection:', err);
  } finally {
    cleanup();
  }
}

main();
