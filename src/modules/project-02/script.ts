const bgImage1 = new Image();
bgImage1.src = "./src/assets/layer-1.png";
const bgImage2 = new Image();
bgImage2.src = "./src/assets/layer-2.png";
const bgImage3 = new Image();
bgImage3.src = "./src/assets/layer-3.png";
const bgImage4 = new Image();
bgImage4.src = "./src/assets/layer-4.png";
const bgImage5 = new Image();
bgImage5.src = "./src/assets/layer-5.png";

class BackgroundLayer {
	private ctx: CanvasRenderingContext2D;
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private image: HTMLImageElement;
	private speedModifier: number;
	private speed: number;
	private gameSpeed: number;

	constructor(
		ctx: CanvasRenderingContext2D,
		image: HTMLImageElement,
		gameSpeed: number,
		speedModifier: number
	) {
		this.ctx = ctx;
		this.x = 0;
		this.y = 0;
		this.width = 1200;
		this.height = 350;
		this.image = image;
		this.speedModifier = speedModifier;
		this.gameSpeed = gameSpeed;
		this.speed = this.gameSpeed * this.speedModifier;
	}
	update() {
		this.speed = this.gameSpeed * this.speedModifier;
		if (this.x <= -this.width) this.x = 0;
		this.x = this.x - this.speed;
	}
	draw() {
		this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		this.ctx.drawImage(
			this.image,
			this.x + this.width,
			this.y,
			this.width,
			this.height
		);
	}
}

export function run(gameSpeed = 4) {
	const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
	const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

	const CANVAS_WIDTH = (canvas.width = 800);
	const CANVAS_HEIGHT = (canvas.height = 350);

	let gameFrame = 0;

	const layer1 = new BackgroundLayer(ctx, bgImage1, gameSpeed, 0);
	const layer2 = new BackgroundLayer(ctx, bgImage2, gameSpeed, 0.4);
	const layer3 = new BackgroundLayer(ctx, bgImage3, gameSpeed, 0.6);
	const layer4 = new BackgroundLayer(ctx, bgImage4, gameSpeed, 0.8);
	const layer5 = new BackgroundLayer(ctx, bgImage5, gameSpeed, 1);

	const bgLayers = [layer1, layer2, layer3, layer4, layer5];

	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		bgLayers.forEach((bgLayer) => {
			bgLayer.update();
			bgLayer.draw();
		});
		gameFrame--;
		requestAnimationFrame(animate);
	}

	animate();
}
