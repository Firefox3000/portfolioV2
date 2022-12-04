// import { createCanvas, loadImage } from 'canvas';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import fs from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  // const { req, res } = event;
  const query = getQuery(event);
  console.log(query);

  console.log(path.relative('/foo/bar/baz', '/foo'));
  console.log(path.join('./'), path.relative('/', ''));

  //Find the absolute path of the json directory
  const tileDir = path.join(process.cwd(), 'public/tile.jpg');

  console.log(process.cwd(), tileDir);
  //Read the json data file data.json
  // const fileContents = await fs.readFile(tileDir + 'tile.jpg');

  const tileBuffer = await fs.readFileSync(tileDir + 'tile.jpg');
  console.log('found tile', !!tileBuffer);

  // const fontSize = 72;
  // const lineHeight = fontSize + 6;

  const imageSize = 800;
  // const maxWidth = 540;

  // let words = query.content || '';
  // console.log(words);

  // // create canvas same width and height as image
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  const bg = await loadImage(tileDir + 'tile.jpg');
  ctx.drawImage(bg, 0, 0, imageSize, imageSize);

  // ctx.font = `400 ${fontSize}px Serif`;
  // ctx.textAlign = 'center';
  // ctx.textBaseline = 'middle';
  // ctx.fillStyle = '#0f1b65';

  // // check line amount
  // let line = '';
  // let lines = [];

  // for (let i = 0; i < words.length; i++) {
  //   let testLine = `${line} ${words[i]}`;
  //   let testWidth = ctx.measureText(testLine).width;

  //   if (testWidth > maxWidth) {
  //     // go to next line
  //     lines.push(line.trim());
  //     line = words[i];
  //   } else {
  //     line = testLine;
  //   }
  // }

  // lines.push(line);

  // // fill tile with text
  // let startX = 0;
  // let startY = imageSize / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

  // for (let i = 0; i < lines.length; i++) {
  //   startX = imageSize / 2;

  //   ctx.fillText(lines[i], startX, startY);

  //   startY += lineHeight;
  // }

  // event.res.end(canvas.toBuffer('image/png', 100));

  // event.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  // res.setHeader("content-type", 'image/')
  return event.res.end(await canvas.encode('jpeg', 80));

  // return res;
  // return event.res;
});
