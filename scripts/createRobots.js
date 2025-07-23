/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config({ path: ".env.local" }); // or ".env"
const fs = require("fs");
const path = require("path");

/** createRobots */
function createRobots() {
	// production
	const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
	const outputPath = path.resolve(__dirname, "../public/robots.txt");
	const robotsContent =
		siteEnv === "production"
			? `User-agent: *
Disallow: /wp-content/uploads/
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /xmlrpc.php`
			: `User-agent: *
Disallow: /`;
	fs.writeFileSync(outputPath, robotsContent);
}

createRobots();
