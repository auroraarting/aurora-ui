/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	// experimental: {
	// 	dynamicIO: true,
	// },
	images: {
		domains: [
			"img.youtube.com",
			"aurora-staging.mystagingwebsite.com",
			"cms-production.auroraer.com",
		],
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: `
        default-src 'self';
        media-src 'self'  data: https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://cms-staging.auroraer.com/;
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms/ https://storage.googleapis.com/ https://googleads.g.doubleclick.net/ https://connect.facebook.net/ https://www.googletagmanager.com/ https://www.youtube.com https://s.ytimg.com https://maps.googleapis.com https://maps.gstatic.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com;
        img-src 'self' data: https://www.google.co.in/ https://www.googletagmanager.com/ https://cms-staging.auroraer.com/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://img.youtube.com https://i.ytimg.com https://maps.googleapis.com https://maps.gstatic.com https://google.com https://ggpht.com;
        font-src 'self' data: https://fonts.gstatic.com https://storage.googleapis.com/ https://maps.gstatic.com;
        connect-src 'self' https://vimeo.com/ https://cms-staging.auroraer.com/ https://audio.api.speechify.com/ https://speechify-api-dot-speechifymobile.uc.r.appspot.com/ https://cdn.jsdelivr.net/ https://auroraer.pinpointhq.com/ https://f.clarity.ms/  https://aurora-staging.mystagingwebsite.com/ https://cms-production.auroraer.com/ https://analytics.google.com/ https://www.youtube.com https://maps.googleapis.com https://www.google.com/;
        frame-src https://www.googletagmanager.com/ https://go.auroraer.com/ https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app https://www.youtube.com https://www.youtube-nocookie.com/ https://player.vimeo.com/ https://www.google.com https://maps.google.com https://www.google.com/maps https://www.podbean.com/ https://embed.podcasts.apple.com/;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        upgrade-insecure-requests;
        `
							.replace(/\s{2,}/g, " ")
							.trim(),
					},
					{
						key: "X-Frame-Options",
						value:
							"ALLOW-FROM https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app/ https://auroraer.com/",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "geolocation=(), camera=(), microphone=()",
					},
					{
						key: "Access-Control-Allow-Origin",
						value:
							"https://www-production.auroraer.com https://www-staging.auroraer.com/ https://staging-aurora-ui.vercel.app/ https://auroraer.com/",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
