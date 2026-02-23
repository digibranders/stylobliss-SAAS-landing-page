const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function(filePath) {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Replace Light Grey globally
    content = content.replace(/167,\s*173,\s*204/g, '120, 127, 167');
    content = content.replace(/167,_173,_204/g, '120,_127,_167');

    // Replace Magenta (text-[rgb(...)]) ONLY if not in a button/link context
    let lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (line.includes('188') && (line.includes('188, 38, 155') || line.includes('188,38,155') || line.includes('188,_38,_155'))) {
            // Check if line indicates an interactive element or if it's inside an style tag we want to keep
            let isInteractive = line.includes('<button') || line.includes('<Link') || line.includes('<a ') || line.includes('hover:') || line.includes('cursor-pointer') || line.includes('href=') || line.includes('to=');
            
            // If not interactive, and it has text-[...], replace it
            if (!isInteractive) {
                line = line.replace(/text-\[rgb\(188,\s*38,\s*155\)\]/g, 'text-[rgb(71,79,123)]');
                line = line.replace(/text-\[rgb\(188,_38,_155\)\]/g, 'text-[rgb(71,_79,_123)]');
                
                // Also check inline styles where color: 'rgb(188, 38, 155)' is set
                line = line.replace(/color:\s*['"]rgb\(188,\s*38,\s*155\)['"]/g, "color: 'rgb(71, 79, 123)'");
                
                lines[i] = line;
            }
        }
    }
    
    content = lines.join('\n');
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
});
