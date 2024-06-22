// Turborium 2024-2024

// consts
const WIDTH = 800;
const HEIGHT = 800;
const FADE_VALUE = 6;
const EXPECTED_FPS = 25;
const SPEED = 0.0003;

// make fps counter
const divFps = document.createElement("div");
divFps.innerHTML = '-';
document.body.appendChild(divFps);

// make canvas
const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);

function frac(value) {
	return value % 1;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let time = 1.0;
let realFps = 0;

function draw() {
	
	// get params
	const context = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	
	// get pixel data
	const imageData = context.getImageData(0, 0, width, height);
	
	// fade
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let index = (width * y + x) * 4;
			imageData.data[index + 0] = Math.max(0, imageData.data[index + 0] - FADE_VALUE); // R
			imageData.data[index + 1] = Math.max(0, imageData.data[index + 1] - FADE_VALUE); // G
			imageData.data[index + 2] = Math.max(0, imageData.data[index + 2] - FADE_VALUE); // B
			imageData.data[index + 3] = 255;// A
		}
	}
	
	// draw
	for (let i = 1; i <= 150; i++) {
		let x = Math.random();
		let y = Math.random();
		const newPixel = [getRandomInt(150), getRandomInt(140), getRandomInt(256)];

		for (let j = 1; j <= 2000; j++) {
			x = frac(time + x + Math.cos(y * 2.2 + x * 0.1));
			y = frac(time * 0.3 + y + Math.sin(x * 1.5));
			
			// variant 2
			//x = frac(time + x + Math.cos(y * 2.2 + x * 0.1));
			//y = frac(time * 0.3 + y + Math.sin(x * 1.5) - 0.5 * Math.sin(y * 0.232 + x * 0.14));

			const screenX = Math.trunc(x * width);
			const screenY = Math.trunc(y * height);
			
			// check coord
			if (screenX < 0 || screenX >= width || screenY < 0 || screenY >= height) {
				continue;
			}
			
			// calc index
			const index = (width * screenY + screenX) * 4;

			// blend pixel
			imageData.data[index + 0] = Math.min(255, imageData.data[index + 0] + newPixel[0]); // R
			imageData.data[index + 1] = Math.min(255, imageData.data[index + 1] + newPixel[1]); // G
			imageData.data[index + 2] = Math.min(255, imageData.data[index + 2] + newPixel[2]); // B
		}
	}
	
	// put pixel data
	context.putImageData(imageData, 0, 0);
	
	time = time + SPEED;
	realFps++;
}

// start
setInterval(draw, 1000 / EXPECTED_FPS);

// fps counter
setInterval(function () {
	divFps.innerHTML = `
		PocketGalaxyJs by Turborium, 
		Width: ${canvas.width}, 
		Height: ${canvas.height}, 
		FPS: ${realFps} (Expected ${EXPECTED_FPS})
	`;
	realFps = 0;
}, 1000);