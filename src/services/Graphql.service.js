import { ServerHeaders } from "@/utils/RequestHeaders";
// import memoizedFetch from "@/lib/memoizedFetch";

/** fetchWithRetry  */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 5000) {
	for (let i = 0; i < retries; i++) {
		try {
			const res = await fetch(url, options);
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			return await res.json();
		} catch (err) {
			if (i === retries - 1) throw err;
			console.warn(`Fetch failed for ${url}, retrying in ${delay}ms...`);
			await new Promise((res) => setTimeout(res, delay));
		}
	}
}

/** GraphQLAPI  */
export default async function GraphQLAPI(query, useServer) {
	const refreshInterval = 30000;

	if (useServer) {
		let res;
		let req;
		try {
			req = await fetch(`${process.env.API_URL}`, {
				...ServerHeaders,
				body: JSON.stringify({ query }),
				// next: { revalidate: 1800 },
			});
			res = await req.json();
			// res = req;
			return res;
		} catch (error) {
			// req = await req.text();
			console.log(error, req, "errror");
		}
	} else {
		// Cache
		let startTime = null; // Start time
		let res;
		let req;
		try {
			startTime = new Date(); // Start time
			const data = {
				url: `${process.env.API_URL}`,
				method: "POST",
				body: { query },
				refreshInterval: refreshInterval,
				headers: {
					...ServerHeaders.headers,
				},
			};
			req = await fetch(`${process.env.REDIS_URL}/api/cache`, {
				"Content-Type": "application/json",
				method: "POST",
				body: JSON.stringify({ ...data }),
			});
			res = await req.json();
			const endTime = new Date(); // End time
			const fetchDuration = endTime - startTime; // Duration in milliseconds
			console.log(
				`Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
			);
			return res;
		} catch (error) {
			const endTime = new Date(); // End time
			const fetchDuration = endTime - startTime; // Duration in milliseconds
			console.log(
				`Error Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
			);
			console.log(error, req, "errror");
		}
	}
}

/** GraphQLAPI  */
export async function GraphQLAPINoBottleneck(query, ttl = 86400) {
	let res;
	let req;

	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

		req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 1800 },
		});
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}

/** GraphQLAPI  */
export async function GraphQLAPILongerRevalidate(query, ttl = 86400) {
	let res;
	let req;
	try {
		// const options = {
		// 	...ServerHeaders,
		// 	body: JSON.stringify({ query }),
		// 	method: "POST",
		// };

		// req = await memoizedFetch(`${process.env.API_URL}`, options, ttl);
		// return req;

		req = await fetch(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 1800 }, // 30 minutes
		});
		res = await req.json();
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
	}
}
