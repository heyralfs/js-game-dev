import { useState } from "react";
import { Project01 } from "./modules/project-01";
import { Project02 } from "./modules/project-02";

type Projects = "01" | "02";

export const App = () => {
	const [currentProject, setCurrentProject] = useState<Projects>();

	function goBack() {
		setCurrentProject(undefined);
	}

	const projects: Record<Projects, JSX.Element> = {
		"01": <Project01 goBack={goBack} />,
		"02": <Project02 goBack={goBack} />,
	};

	if (!currentProject) {
		return (
			<div className="main">
				<button onClick={() => setCurrentProject("01")}>
					See project 01
				</button>
				<button onClick={() => setCurrentProject("02")}>
					See project 02
				</button>
			</div>
		);
	}

	return projects[currentProject];
};
