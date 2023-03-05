export enum PlayerStates {
	"idle" = "idle",
	"jump" = "jump",
	"fall" = "fall",
	"run" = "run",
	"dizzy" = "dizzy",
	"sit" = "sit",
	"roll" = "roll",
	"bite" = "bite",
	"ko" = "ko",
	"getHit" = "getHit",
}

type Frames = { loc: { x: number; y: number }[] };

type SprintAnimation = Record<PlayerStates, Frames>;

const playerImage = new Image();
playerImage.src = "./src/assets/shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;

const spriteAnimations = {} as SprintAnimation;

const animationsStates: { name: PlayerStates; frames: number }[] = [
	{ name: PlayerStates.idle, frames: 7 },
	{ name: PlayerStates.jump, frames: 7 },
	{ name: PlayerStates.fall, frames: 7 },
	{ name: PlayerStates.run, frames: 9 },
	{ name: PlayerStates.dizzy, frames: 11 },
	{ name: PlayerStates.sit, frames: 5 },
	{ name: PlayerStates.roll, frames: 7 },
	{ name: PlayerStates.bite, frames: 7 },
	{ name: PlayerStates.ko, frames: 12 },
	{ name: PlayerStates.getHit, frames: 4 },
];

animationsStates.forEach((state, index) => {
	let frames: Frames = { loc: [] };
	for (let j = 0; j < state.frames; j++) {
		const positionX = j * spriteWidth;
		const positionY = index * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimations[state.name] = frames;
});

export function run(playerState: PlayerStates) {
	const canvas = <HTMLCanvasElement>document.getElementById("canvas1");
	const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

	const CANVAS_WIDTH = (canvas.width = 600);
	const CANVAS_HEIGHT = (canvas.height = 600);

	let gameFrame = 0;
	const staggerFrames = 5;

	function animate() {
		ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		const position =
			Math.floor(gameFrame / staggerFrames) %
			spriteAnimations[playerState].loc.length;
		const frameX = spriteWidth * position;
		const frameY = spriteAnimations[playerState].loc[position].y;

		ctx.drawImage(
			playerImage,
			frameX,
			frameY,
			spriteWidth,
			spriteHeight,
			0,
			0,
			spriteWidth,
			spriteHeight
		);

		gameFrame++;
		requestAnimationFrame(animate);
	}

	animate();
}
