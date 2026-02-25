const fs = require('fs');
const content = fs.readFileSync('static-site/index.html', 'utf8');

const regex = /data-menu-trigger="([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  console.log('Found trigger:', match[1]);
}
