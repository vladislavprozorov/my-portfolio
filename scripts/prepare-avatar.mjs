import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

async function ensureInputExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function makeDirIfNeeded(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function generate() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const inputJpg = path.join(publicDir, 'okme.jpg');
  const outputs = {
    webp1x: path.join(publicDir, 'okme.webp'),
    webp2x: path.join(publicDir, 'okme@2x.webp'),
    jpg2x:  path.join(publicDir, 'okme@2x.jpg'),
  };

  const exists = await ensureInputExists(inputJpg);
  if (!exists) {
    console.error('Input image not found at', inputJpg);
    process.exitCode = 1;
    return;
  }

  await makeDirIfNeeded(publicDir);

  const oneX = 280; // matches About.jsx display size
  const twoX = oneX * 2; // 560

  // Create 1x WEBP (cropped square, attention to face)
  await sharp(inputJpg)
    .resize({ width: oneX, height: oneX, fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputs.webp1x);

  // Create 2x WEBP
  await sharp(inputJpg)
    .resize({ width: twoX, height: twoX, fit: 'cover', position: 'attention' })
    .webp({ quality: 82, effort: 4 })
    .toFile(outputs.webp2x);

  // Create 2x JPG (fallback for non-WEBP browsers)
  await sharp(inputJpg)
    .resize({ width: twoX, height: twoX, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toFile(outputs.jpg2x);

  console.log('Generated:', outputs);
}

generate().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
