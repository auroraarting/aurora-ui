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
export default async function GraphQLAPI(query, ttl = 86400) {
	let res;
	let req;
	try {
		req = await fetchWithRetry(`${process.env.API_URL}`, {
			...ServerHeaders,
			body: JSON.stringify({ query }),
			next: { revalidate: 1800 },
		});
		// res = await req.json();
		res = req;
		return res;
	} catch (error) {
		// req = await req.text();
		console.log(error, req, "errror");
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
