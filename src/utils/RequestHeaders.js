/** Request Headers for Server side fetching */
export const ServerHeaders = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
	},
	method: "POST",
};
