import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas';

// TODO: maybe rewrite in rust?

/** @type {import("@vercel/node").VercelApiHandler} */
export default async function handler(request, response) {
	if (!request.url) return response.status(400);

	const url = new URL(request.url, `http://${request.headers.host}`);
	const { searchParams } = url;
	const hasContent = searchParams.has('content');
	const content = hasContent ? searchParams.get('content') : '';

	GlobalFonts.registerFromPath('./assets/NotoColorEmoji-Regular.ttf', 'NotoColorEmoji');
	GlobalFonts.registerFromPath('./assets/PTSerif-Italic.ttf', 'pt');

	const fontSize = 72;
	const lineHeight = fontSize + 6;

	const imageSize = 800;
	const maxWidth = 540;

	const words = content.split(' ');

	// create canvas same width and height as image
	const canvas = createCanvas(imageSize, imageSize);
	const ctx = canvas.getContext('2d');

	const tile = await loadImage('./assets/tile.jpg');
	ctx.drawImage(tile, 0, 0, imageSize, imageSize);

	ctx.font = `400 ${fontSize}px pt, NotoColorEmoji`;
	ctx.textAlign = 'center';
	ctx.fillStyle = '#0f1b65';

	// check line amount
	let line = '';
	/** @type {string[]} */
	const lines = [];

	for (const word of words) {
		const testLine = `${line} ${word}`;
		const testWidth = ctx.measureText(testLine).width;

		if (testWidth > maxWidth) {
			// go to next line
			lines.push(line.trim());
			line = word;
			continue;
		}

		line = testLine;
	}

	lines.push(line);

	// fill tile with text
	let startX = 0;
	let startY = imageSize / 2 - ((lines.length - 1) * lineHeight) / 2 + 24;

	for (const line of lines) {
		startX = imageSize / 2;
		ctx.fillText(line, startX, startY);
		startY += lineHeight;
	}

	response.status(200).setHeader('Content-Type', 'image/png').send(canvas.toBuffer('image/png'));
}
