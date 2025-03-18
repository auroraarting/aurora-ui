/** Request Headers for Server side fetching */
export const ServerHeaders = {
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`,
	},
};
