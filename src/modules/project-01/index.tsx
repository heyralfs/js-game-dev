import { useEffect, useRef, useState } from "react";
import { ProjectPage } from "../../interfaces";
import { run, PlayerStates } from "./script";
import styles from "./styles.module.css";

export const Project01: ProjectPage = ({ goBack }) => {
	const stateNames = Object.keys(
		PlayerStates
	) as (keyof typeof PlayerStates)[];
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [playerState, setPlayerState] = useState<PlayerStates>(
		PlayerStates.idle
	);

	useEffect(() => {
		if (!canvasRef.current) return;
		run(playerState);
	}, [playerState]);

	return (
		<div className={styles.container}>
			<div>
				<label htmlFor="animations">Choose animation: </label>
				<select
					name="animations"
					onChange={(e) =>
						setPlayerState(e.target.value as PlayerStates)
					}
				>
					{stateNames.map((stateName) => (
						<option key={stateName} value={PlayerStates[stateName]}>
							{stateName}
						</option>
					))}
				</select>
			</div>

			<canvas id="canvas1" ref={canvasRef} />

			<button onClick={goBack}>Go back</button>
		</div>
	);
};
