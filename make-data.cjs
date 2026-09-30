const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/trailers');
const files = fs.readdirSync(dir).filter(f=> f.toLowerCase().endsWith('.mp4')).sort();

const data = files.map((file, i) => {
  const title = file.replace(/\.mp4$/i, '');
  return {
    id: i+1,
    title: title,
    fileName: file,
    src: `/trailers/${file}`
  };
});

// Create folder if not exists
if (!fs.existsSync('public')) fs.mkdirSync('public');

fs.writeFileSync('trailers_data.json', JSON.stringify(data, null, 2));
console.log(`DONE! Created trailers_data.json with ${data.length} trailers`);
data.forEach(d=> console.log(d.title));