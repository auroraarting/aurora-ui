/**
 * WordPress post type -> WPGraphQL names, from cms-production's
 * `{ contentTypes { nodes { name graphqlSingleName graphqlPluralName } } }`
 * (Sep 2026). The services tag their calls with the GraphQL single name
 * (event, `event:${slug}`), WP Webhooks sends the post type (tribe_events), so
 * utils/WordpressWebhook.js uses this to turn one into the other.
 * Add a row when a new post type is registered in WordPress.
 */
export const cmsContentTypes = {
	post: { single: "post", plural: "posts" },
	page: { single: "page", plural: "pages" },
	attachment: { single: "mediaItem", plural: "mediaItems" },
	"clients-logo": { single: "clientsLogo", plural: "clientsLogos" },
	country: { single: "country", plural: "countries" },
	"early-career": { single: "earlyCareer", plural: "earlyCareers" },
	event: { single: "event", plural: "events" },
	howwehelp: { single: "howwehelp", plural: "howWeHelps" },
	offices: { single: "office", plural: "offices" },
	podcast: { single: "podcast", plural: "podcasts" },
	"post-author": { single: "postAuthor", plural: "postAuthors" },
	"post-speaker": { single: "postSpeaker", plural: "postSpeakers" },
	products: { single: "product", plural: "products" },
	services: { single: "service", plural: "services" },
	softwares: { single: "software", plural: "softwares" },
	team: { single: "team", plural: "teams" },
	testimonial: { single: "testimonial", plural: "testimonials" },
	video: { single: "video", plural: "videos" },
	tribe_events: { single: "webinar", plural: "webinars" },
	whoareyou: { single: "whoareyou", plural: "whoareyous" },
};
