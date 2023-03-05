import { useEffect, useRef, useState } from "react";
import { animate, PlayerStates } from "./script";
import styles from "./styles.module.css";

export const Project01 = () => {
	const stateNames = Object.keys(
		PlayerStates
	) as (keyof typeof PlayerStates)[];
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const [playerState, setPlayerState] = useState<PlayerStates>(
		PlayerStates.idle
	);

	useEffect(() => {
		if (!canvasRef.current) return;

		const ctx = canvasRef.current.getContext("2d")!;
		const canvasWidth = (canvasRef.current.width = 600);
		const canvasHeight = (canvasRef.current.height = 600);

		// todo: fix the "animation speed-up" side effect when calling animate over and over again
		animate(playerState, ctx, canvasWidth, canvasHeight);
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

			<canvas ref={canvasRef} />
		</div>
	);
};
