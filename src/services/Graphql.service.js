import { ServerHeaders } from "@/utils/RequestHeaders";
import { headers } from "next/headers";
// import memoizedFetch from "@/lib/memoizedFetch";

/** GraphQLAPI  */
export default async function GraphQLAPI(query, ttl = 86400) {
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
export async function GraphQLAPICache(query, refreshInterval = 30000) {
	let res;
	let req;
	try {
		// const backendRes = await fetch(url, {
		// 	method: backendMethod,
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		...(headers && headers),
		// 	},
		// 	body: backendBody ? JSON.stringify(backendBody) : undefined,
		// });
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
				// ...ServerHeaders,
				"Content-Type": "application/json",
				method: "POST",
				body: JSON.stringify({ ...data }),
				next: { revalidate: 1800 },
			}
		);
		res = await req.json();
		console.log(data, "asdasdasdadas");
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
