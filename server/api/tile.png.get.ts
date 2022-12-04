// import { createCanvas, loadImage } from 'canvas';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { promises as fs } from 'node:fs';
import path from 'node:path';

export default defineEventHandler(async (event) => {
  // const { req, res } = event;
  const query = getQuery(event);
  console.log('query', query);

  // console.log(path.relative('/', './'));
  // console.log(path.join('./'), path.relative('/', ''));

  //Find the absolute path of the json directory
  // const tileDir = path.join(process.cwd(), 'public/tile.jpg');

  // console.log(process.cwd());
  //Read the json data file data.json
  // const fileContents = await fs.readFile(tileDir + 'tile.jpg');

  // console.log(await fs.readdir(process.cwd()));
  // console.log('---------');
  // // console.log(await fs.readdir('./'));
  // console.log('---------');
  // console.log(await fs.readdir('/'));
  // console.log('---------');
  // console.log(await fs.readdir('../'));
  // console.log('---------');
  // console.log(await fs.readdir('/opt/'));
  // console.log('---------');
  // console.log(await fs.readdir('../opt'));
  // console.log(await fs.readdir('../opt/public'));

  const getFileList = async (dirName: string) => {
    let files: string[] = [];
    const items = await fs.readdir(dirName, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory() && !item.name.includes('node_modules')) {
        files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
      } else {
        files.push(`${dirName}/${item.name}`);
      }
    }

    return files;
  };

  const files = getFileList('/');
  console.log(files);

  // const jsonDirectory = path.join(process.cwd(), 'assets');
  //Read the json data file data.json
  // const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');

  // fs.readdir(process.cwd(), () => {
  //   files.forEach((file) => {
  //     console.log(file);
  //   });
  // });

  // const tileBuffer = await fs.readFileSync(tileDir);
  // console.log('found tile', !!tileBuffer);

  // const fontSize = 72;
  // const lineHeight = fontSize + 6;

  const imageSize = 800;
  // const maxWidth = 540;

  // let words = query.content || '';
  // console.log(words);

  // // create canvas same width and height as image
  const canvas = createCanvas(imageSize, imageSize);
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.rect(20, 20, 150, 100);
  ctx.stroke();

  // const bg = await loadImage(tileDir);
  // ctx.drawImage(bg, 0, 0, imageSize, imageSize);

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

  event.res.writeHead(200, { 'Content-Type': 'image/jpeg' });
  // res.setHeader("content-type", 'image/')
  return event.res.end(await canvas.encode('jpeg', 80));
  // return event.res.end({ foo: 'bar' });

  // return res;
  // return event.res;
});
