const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let replaced = content
    // Typography scaling
    .replace(/text-6xl md:text-9xl/g, 'text-4xl md:text-6xl lg:text-9xl sm:break-words')
    .replace(/text-5xl md:text-9xl/g, 'text-4xl md:text-6xl lg:text-9xl sm:break-words')
    .replace(/text-4xl md:text-8xl/g, 'text-3xl md:text-5xl lg:text-8xl sm:break-words')
    .replace(/text-5xl md:text-7xl/g, 'text-3xl md:text-5xl lg:text-7xl sm:break-words')
    .replace(/text-4xl md:text-6xl/g, 'text-3xl md:text-4xl lg:text-6xl sm:break-words')
    // UI stacking fixes
    .replace(/className="([^"]*)flex items-center gap-14([^"]*)"/g, 'className="$1flex flex-col md:flex-row items-center gap-6 md:gap-14$2"')
    .replace(/className="([^"]*)flex justify-between([^"]*)"/g, 'className="$1flex flex-col md:flex-row justify-between gap-6 md:gap-0$2"')
    .replace(/className="([^"]*)flex gap-8([^"]*)"/g, 'className="$1flex flex-col md:flex-row gap-6 md:gap-8$2"')
    .replace(/grid grid-cols-2(?! md:grid-cols-2)/g, 'grid grid-cols-1 md:grid-cols-2')
    .replace(/grid grid-cols-3(?! md:grid-cols-3)/g, 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3')
    .replace(/grid grid-cols-4(?! md:grid-cols-4)/g, 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4')
    // Fix huge px widths that break mobile
    .replace(/w-\[600px\]/g, 'w-full md:w-[600px]')
    .replace(/w-\[800px\]/g, 'w-full md:w-[800px]')
    .replace(/w-\[500px\]/g, 'w-full md:w-[500px]')
    .replace(/h-\[600px\]/g, 'h-auto md:h-[600px]')
    .replace(/h-\[800px\]/g, 'h-auto md:h-[800px]');

  if (content !== replaced) {
    fs.writeFileSync(file, replaced, 'utf8');
    changedCount++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Updated ${changedCount} files.`);
