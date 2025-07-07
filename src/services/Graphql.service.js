import { ServerHeaders } from "@/utils/RequestHeaders";
import { headers } from "next/headers";
// import memoizedFetch from "@/lib/memoizedFetch";

/** GraphQLAPI  */
export async function GraphQLAPINoCache(query, ttl = 86400) {
	let res;
	let req;
	try {
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
export default async function GraphQLAPI(query, refreshInterval = 30000) {
	let res;
	let req;
	try {
		const startTime = new Date(); // Start time

		const data = {
			url: `${process.env.API_URL}`,
			method: "POST",
			body: { query },
			refreshInterval: refreshInterval,
			headers: {
				...ServerHeaders.headers,
			},
		};
		req = await fetch(
			"https://aurora-sync-git-main-mvishu405s-projects.vercel.app/api/cache",
			{
				"Content-Type": "application/json",
				method: "POST",
				body: JSON.stringify({ ...data }),
			}
		);
		res = await req.json();

		const endTime = new Date(); // End time
		const fetchDuration = endTime - startTime; // Duration in milliseconds
		console.log(
			`Fetch completed in ${fetchDuration}ms at ${endTime.toLocaleString()}`
		);

		return res;
	} catch (error) {
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
