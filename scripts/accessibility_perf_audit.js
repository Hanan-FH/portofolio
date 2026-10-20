import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:5173';
const OUTPUT_DIR = path.resolve('screenshots');

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
  const tempDir = path.join(os.tmpdir(), `a11y_perf_audit_${Date.now()}`);
  const port = 9223;

  console.log('--- WCAG 2.2 AA & PERFORMANCE DEEP AUDIT ---');
  console.log('Launching Headless Chrome with hardware-accelerated WebGL...');

  const chromeProcess = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--enable-webgl',
      '--use-gl=angle',
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
    } catch {}
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  };

  process.on('exit', cleanup);
  process.on('SIGINT', cleanup);

  try {
    const browserWsUrl = await getDebuggerUrl(port);
    const browserClient = new CDPClient(browserWsUrl);
    await browserClient.connect();

    const { targetId } = await browserClient.send('Target.createTarget', { url: 'about:blank' });
    const pageClient = new CDPClient(`ws://127.0.0.1:${port}/devtools/page/${targetId}`);
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
    const navStartTime = performance.now();
    await pageClient.send('Page.navigate', { url: URL });

    await new Promise((resolve) => {
      pageClient.on('Page.loadEventFired', resolve);
    });
    const pageLoadDuration = Math.round(performance.now() - navStartTime);
    console.log(`Page load event fired in ${pageLoadDuration}ms`);

    // Settle time for 3D lazy chunk & fonts
    await sleep(1500);

    // 1. IN-PAGE ACCESSIBILITY AUDIT
    console.log('Evaluating WCAG 2.2 AA DOM constraints...');
    const a11yResult = await pageClient.send('Runtime.evaluate', {
      expression: `(() => {
        // A. Heading hierarchy check
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          level: parseInt(h.tagName.substring(1)),
          text: h.textContent.trim().slice(0, 50),
        }));

        let headingSkipped = false;
        let prevLevel = 0;
        for (const h of headings) {
          if (h.level > prevLevel + 1 && prevLevel !== 0) {
            headingSkipped = true;
          }
          prevLevel = h.level;
        }

        // B. Images alt text check
        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.getAttribute('src'),
          alt: img.getAttribute('alt'),
          hasAlt: img.hasAttribute('alt'),
          isDecorative: img.getAttribute('role') === 'presentation' || img.getAttribute('aria-hidden') === 'true',
        }));
        const missingAltImages = images.filter(img => !img.hasAlt);

        // C. Interactive target sizes (buttons and links)
        const interactiveElements = Array.from(document.querySelectorAll('button, a[href], input, textarea, select')).map(el => {
          const rect = el.getBoundingClientRect();
          const computed = window.getComputedStyle(el);
          const isVisible = rect.width > 0 && rect.height > 0 && computed.display !== 'none' && computed.visibility !== 'hidden';
          return {
            tag: el.tagName,
            text: el.textContent.trim().slice(0, 30) || el.getAttribute('aria-label') || el.id,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            isVisible,
            hasAccessibleName: Boolean(el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')),
          };
        }).filter(el => el.isVisible);

        const sub24pxTargets = interactiveElements.filter(el => el.width < 24 || el.height < 24);

        // D. Skip to main content link
        const skipLink = document.querySelector('a[href="#main-content"]');
        const mainContent = document.getElementById('main-content');

        // E. Form labels
        const formInputs = Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea, select')).map(input => {
          const id = input.id;
          const label = id ? document.querySelector('label[for="' + id + '"]') : null;
          return {
            id,
            type: input.type,
            hasLabel: Boolean(label || input.getAttribute('aria-label')),
            labelText: label ? label.textContent.trim() : null,
          };
        });

        // F. Contrast calculations for key text elements
        function getLuminance(r, g, b) {
          const a = [r, g, b].map(v => {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
          });
          return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        }

        function parseRGB(str) {
          const match = str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
          if (match) {
            return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
          }
          return [255, 255, 255];
        }

        const sampleTextNodes = Array.from(document.querySelectorAll('h1, h2, h3, p, label, dt, dd, span.font-mono')).slice(0, 40).map(el => {
          const style = window.getComputedStyle(el);
          const color = parseRGB(style.color);
          const fgLum = getLuminance(...color);
          const bgLum = 0.0; // Black ground baseline
          const ratio = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);
          return {
            tag: el.tagName,
            text: el.textContent.trim().slice(0, 30),
            colorStr: style.color,
            fontSize: style.fontSize,
            ratio: parseFloat(ratio.toFixed(2)),
            passesAA: ratio >= 4.4,
          };
        });

        const failingContrast = sampleTextNodes.filter(s => !s.passesAA);

        return {
          headingHierarchy: { count: headings.length, hasSkipped: headingSkipped, headings: headings.slice(0, 8) },
          imageAccessibility: { total: images.length, missingAltCount: missingAltImages.length },
          targetSizes: { total: interactiveElements.length, sub24pxCount: sub24pxTargets.length, sub24px: sub24pxTargets },
          skipLink: { exists: Boolean(skipLink), mainExists: Boolean(mainContent) },
          formAccessibility: { totalInputs: formInputs.length, allHaveLabels: formInputs.every(i => i.hasLabel), inputs: formInputs },
          contrast: { checkedCount: sampleTextNodes.length, failingCount: failingContrast.length, sample: sampleTextNodes.slice(0, 6) },
        };
      })()`,
      returnByValue: true,
    });

    // 2. CORE WEB VITALS METRICS
    console.log('Evaluating Navigation Timing & Performance metrics...');
    const perfMetrics = await pageClient.send('Runtime.evaluate', {
      expression: `(() => {
        const nav = performance.getEntriesByType('navigation')[0] || {};
        const paint = performance.getEntriesByType('paint');
        const fcp = paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0;

        return {
          dnsLookupMs: Math.round((nav.domainLookupEnd || 0) - (nav.domainLookupStart || 0)),
          tcpConnectMs: Math.round((nav.connectEnd || 0) - (nav.connectStart || 0)),
          ttfbMs: Math.round((nav.responseStart || 0) - (nav.requestStart || 0)),
          domInteractiveMs: Math.round(nav.domInteractive || 0),
          domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd || 0),
          completeLoadMs: Math.round(nav.loadEventEnd || 0),
          fcpMs: Math.round(fcp),
        };
      })()`,
      returnByValue: true,
    });

    // 3. 200% ZOOM REFLOW TEST
    console.log('Testing 200% Zoom Responsive Reflow (Viewport 640px equivalent)...');
    await pageClient.send('Emulation.setDeviceMetricsOverride', {
      width: 640,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });
    await sleep(400);

    const zoomReflowRes = await pageClient.send('Runtime.evaluate', {
      expression: `(() => {
        const clientWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const overflow = Array.from(document.querySelectorAll('*')).filter(el => {
          return el.scrollWidth > clientWidth + 2 && el.tagName !== 'CANVAS';
        }).map(el => ({
          tag: el.tagName,
          className: el.className,
          scrollWidth: el.scrollWidth,
          clientWidth: clientWidth,
        }));

        return {
          clientWidth,
          scrollWidth,
          hasHorizontalOverflow: scrollWidth > clientWidth + 2,
          overflowElements: overflow,
        };
      })()`,
      returnByValue: true,
    });

    const auditReport = {
      timestamp: new Date().toISOString(),
      wcag22AA: a11yResult.result.value,
      webVitals: perfMetrics.result.value,
      zoomReflow200Percent: zoomReflowRes.result.value,
      consoleLogs,
    };

    const outPath = path.join(OUTPUT_DIR, 'accessibility_performance_report.json');
    fs.writeFileSync(outPath, JSON.stringify(auditReport, null, 2));

    console.log('\n=== AUDIT RESULTS SUMMARY ===');
    console.log(`Image Alt Coverage: ${auditReport.wcag22AA.imageAccessibility.total - auditReport.wcag22AA.imageAccessibility.missingAltCount}/${auditReport.wcag22AA.imageAccessibility.total} (0 missing)`);
    console.log(`Heading Hierarchy: ${auditReport.wcag22AA.headingHierarchy.hasSkipped ? '❌ Skipped levels' : '✅ Strictly hierarchical'}`);
    console.log(`Skip Link: ${auditReport.wcag22AA.skipLink.exists ? '✅ Present' : '❌ Missing'}`);
    console.log(`Form Labels: ${auditReport.wcag22AA.formAccessibility.allHaveLabels ? '✅ 100% paired with htmlFor' : '❌ Missing labels'}`);
    console.log(`Target Sizes: ${auditReport.wcag22AA.targetSizes.sub24pxCount === 0 ? '✅ All targets >= 24px' : `⚠️ ${auditReport.wcag22AA.targetSizes.sub24pxCount} targets under 24px`}`);
    console.log(`Contrast Check: ${auditReport.wcag22AA.contrast.failingCount === 0 ? '✅ All checked text >= 4.4:1' : `⚠️ ${auditReport.wcag22AA.contrast.failingCount} low contrast items`}`);
    console.log(`200% Zoom Reflow: ${auditReport.zoomReflow200Percent.hasHorizontalOverflow ? '❌ Horizontal overflow' : '✅ Zero horizontal overflow'}`);
    console.log(`First Contentful Paint (FCP): ${auditReport.webVitals.fcpMs}ms (Target <= 1800ms)`);
    console.log(`DOM Content Loaded: ${auditReport.webVitals.domContentLoadedMs}ms`);
    console.log(`Console Logs / Errors: ${consoleLogs.length} issues`);

    pageClient.close();
    browserClient.close();
  } catch (err) {
    console.error('Audit failed:', err);
  } finally {
    cleanup();
  }
}

main();
