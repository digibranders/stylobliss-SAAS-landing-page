import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function render() {
  try {
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });

    const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
    const { renderToString } = await vite.ssrLoadModule('react-dom/server');
    const { StaticRouter } = await vite.ssrLoadModule('react-router-dom/server');
    const React = await vite.ssrLoadModule('react');

    const routes = ['/', '/salons', '/faq', '/tutorials', '/blog', '/contact', '/demo', '/pricing', '/why', '/login', '/trial'];

    for (const url of routes) {
      console.log(`Rendering ${url}...`);

      const appHtml = renderToString(
        React.createElement(StaticRouter, { location: url }, React.createElement(App))
      );

      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>stylobliss saas landing page</title>
  <link rel="stylesheet" href="/styles/globals.css">
  <link rel="stylesheet" href="/styles/index.css">
</head>
<body>
  <div id="root">${appHtml}</div>
  <script type="module" src="/scripts/main.js"></script>
</body>
</html>`;

      const dir = url === '/' ? path.resolve(__dirname, 'static-site') : path.resolve(__dirname, `static-site${url}`);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), fullHtml);
      console.log(`Saved ${url} -> ${path.join(dir, 'index.html')}`);
    }

    await vite.close();
    console.log('Rendering complete!');
  } catch (e) {
    console.error('Failed to render:', e);
    process.exit(1);
  }
}

render();
