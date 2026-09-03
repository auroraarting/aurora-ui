import Bottleneck from "bottleneck";

// One queue shared by every outbound WordPress call — GraphQL and REST alike.
//
// It used to be two separate Bottleneck instances, one per service, each with
// maxConcurrent 4. That meant up to eight calls in flight at once with no
// coordination between them, and Pressable answered with 429s and Wordfence
// 403s. Sharing a single queue is the whole point: pacing only works if every
// call waits in the same line.
//
// The default is strictly serial — one request at a time, with a fixed gap
// after each — because that is the shape that survives Pressable's throttling.
// `minTime` is Bottleneck's minimum spacing between *starts*, so with
// maxConcurrent 1 the effective pause is REQUEST_PAUSE_MS after each response.
//
// Both knobs are environment variables so the pacing can be tuned on Vercel
// without a code change:
//   WP_MAX_CONCURRENT  parallel calls        (default 1)
//   WP_REQUEST_PAUSE_MS  gap between starts  (default 400)
const toInt = (value, fallback) => {
	const parsed = Number.parseInt(value ?? "", 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

export const maxConcurrent = Math.max(1, toInt(process.env.WP_MAX_CONCURRENT, 1));
export const requestPauseMs = toInt(process.env.WP_REQUEST_PAUSE_MS, 400);

export const wordpressLimiter = new Bottleneck({
	maxConcurrent,
	minTime: requestPauseMs,
});

// Surfaced once per process so a slow build's pacing is visible in the log
// rather than guessed at.
if (process.env.NEXT_PHASE === "phase-production-build") {
	console.log(
		`[wp-limiter] maxConcurrent=${maxConcurrent} pause=${requestPauseMs}ms (shared by GraphQL + REST)`,
	);
}
