/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require("child_process");

/** formatDuration: 754321ms -> "12m 34s" */
function formatDuration(ms) {
	const totalSeconds = Math.round(ms / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return minutes ? `${minutes}m ${seconds}s` : `${seconds}s`;
}

/** timedBuild: runs `next build` and logs how long it took */
function timedBuild() {
	const startTime = Date.now();
	console.log(`[build] started at ${new Date(startTime).toLocaleString()}`);

	const build = spawn("next", ["build"], { stdio: "inherit", shell: true });

	build.on("exit", (code) => {
		const status = code === 0 ? "completed" : `failed (exit code ${code})`;
		console.log(
			`[build] ${status} in ${formatDuration(Date.now() - startTime)} ` +
				`at ${new Date().toLocaleString()}`,
		);
		process.exit(code ?? 1);
	});
}

timedBuild();
