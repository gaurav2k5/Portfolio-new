import fs from 'fs';
import path from 'path';
import convert from 'heic-convert';

const srcDir = 'D:\\ME';
const destPublic = 'D:\\Design\\New Portfolio\\public\\me';
const destLocal = 'D:\\Design\\New Portfolio\\me';

fs.mkdirSync(destPublic, { recursive: true });
fs.mkdirSync(destLocal, { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.toLowerCase().endsWith('.heic'));
console.log(`Found ${files.length} HEIC files in ${srcDir}`);

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const baseName = path.parse(file).name;
  console.log(`Converting ${file}...`);
  
  const inputBuffer = fs.readFileSync(filePath);
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.92
  });
  
  const publicOut = path.join(destPublic, `${baseName}.jpg`);
  const localOut = path.join(destLocal, `${baseName}.jpg`);
  
  fs.writeFileSync(publicOut, outputBuffer);
  fs.writeFileSync(localOut, outputBuffer);
  console.log(`Saved -> ${publicOut} (${(outputBuffer.length / 1024).toFixed(1)} KB)`);
}

console.log('Conversion completed successfully!');
