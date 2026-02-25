const fs = require('fs');
const path = require('path');

function processHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processHtmlFiles(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Calculate relative depth
      const relativePath = path.relative(path.join(__dirname, 'static-site'), dir);
      const depth = relativePath === '' ? 0 : relativePath.split(path.sep).length;
      const prefix = depth === 0 ? '.' : '../'.repeat(depth).slice(0, -1);
      
      // Replace absolute paths with relative ones
      content = content.replace(/href="\/styles\//g, `href="${prefix}/styles/`);
      content = content.replace(/src="\/scripts\//g, `src="${prefix}/scripts/`);
      content = content.replace(/src="\/assets\//g, `src="${prefix}/assets/`);
      content = content.replace(/href="\/images\//g, `href="${prefix}/images/`);
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processHtmlFiles(path.join(__dirname, 'static-site'));
console.log('Fixed absolute paths to relative paths.');
