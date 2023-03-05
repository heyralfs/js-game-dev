import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { run } from "./script";
import { ProjectPage } from "../../interfaces";

export const Project02: ProjectPage = ({ goBack }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [gameSpeed, setGameSpeed] = useState(4);

	useEffect(() => {
		if (!canvasRef.current) return;
		run(gameSpeed);
	}, [gameSpeed]);

	return (
		<div className={styles.container}>
			<div className={styles.control}>
				<p>Change game speed:</p>
				<button onClick={() => setGameSpeed(2)}>Slow</button>
				<button onClick={() => setGameSpeed(4)}>Medium</button>
				<button onClick={() => setGameSpeed(8)}>Fast</button>
			</div>

			<canvas id="canvas1" ref={canvasRef} />

			<button onClick={goBack}>Go back</button>
		</div>
	);
};
