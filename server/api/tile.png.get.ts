import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';
import { promises as fs } from 'node:fs';
// import path from 'node:path';

GlobalFonts.registerFromPath(
  '../server/api/NotoColorEmoji-Regular.ttf',
  'NotoColorEmoji'
);

GlobalFonts.registerFromPath('../server/api/PTSerif-Italic.ttf', 'pt');

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  console.log(process.cwd(), await fs.readdir('./'));
  console.log(process.cwd(), await fs.readdir('./server/api'));

  console.info(
    GlobalFonts.families.filter(
      (font) => font.family.includes('Emoji') || font.family.includes('pt')
    )
  );

  const fontSize = 72;
  const lineHeight = fontSize + 6;

  const imageSize = 800;
  const maxWidth = 540;

  let words = query.content || '';
  words = words.split(' ');

  // create canvas same width and height as image
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  // would be better if image was loaded through fs
  const tile = await loadImage(
    'https://github.com/Vuurvos1/portfolio/blob/feat/tile/public/tile.jpg?raw=true'
  );
  ctx.drawImage(tile, 0, 0, imageSize, imageSize);

  // italic
  // "NotoColorEmoji, pt"
  ctx.font = `400 ${fontSize}px pt, NotoColorEmoji`;

  // ctx.font = `${fontSize}px NotoColorEmoji`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#0f1b65';

  // check line amount
  let line = '';
  let lines = [];

  for (const word of words) {
    let testLine = `${line} ${word}`;
    let testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      // go to next line
      lines.push(line.trim());
      line = word;
    } else {
      line = testLine;
    }
  }

  lines.push(line);

  // fill tile with text
  let startX = 0;
  let startY = imageSize / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

  for (const line of lines) {
    startX = imageSize / 2;
    // ctx.fillText(line, startX, startY);
    ctx.fillText(line, startX, startY);
    // ctx.fillText('😀😃😄😁😆😅😂🤣☺️😊😊😇', 50, 150);
    startY += lineHeight;
  }

  event.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  event.res.end(canvas.toBuffer('image/jpeg', 100));
});
