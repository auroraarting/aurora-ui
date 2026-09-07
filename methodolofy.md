# Aurora Methodologies API

Read-only JSON API for Aurora methodology documents, served by the Aurora CMS. No API key or login is required. Responses are standard Strapi v5 REST payloads.

| Environment | Base URL                                                 |
| ----------- | -------------------------------------------------------- |
| Production  | `https://cms.service.auroraer.com/api/methodologies`     |
| Development | `https://cms-dev.service.auroraer.com/api/methodologies` |

CORS is open, so the endpoints can be called directly from a browser as well as from a server.

## Endpoints

### `GET /api/methodologies`

Returns a paginated list of methodologies. Use `filters`, `populate`, `locale`, `sort` and `pagination` query parameters to shape the response.

### `GET /api/methodologies/{documentId}`

Returns one methodology by its `documentId`. Most integrations will instead filter the list endpoint by `slug`, which is stable and human-readable.

## Query parameters

| Parameter                                  | Example                       | Notes                                                                                      |
| ------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| `locale`                                   | `locale=ja`                   | Defaults to `en`. Returns the entry in that locale if one exists, otherwise an empty list. |
| `filters[product][name][$eq]`              | `Amun`                        | Product name as shown in EOS.                                                              |
| `filters[slug][$eq]`                       | `battery-revenue-methodology` | Look up a single document by slug.                                                         |
| `filters[chapters][regions][code][$eq]`    | `GBR`                         | Only documents with at least one chapter tagged for that region.                           |
| `populate[product]`                        | `true`                        | Include the related product.                                                               |
| `populate[chapters]...`                    | see examples                  | Chapters and their blocks are not returned unless populated.                               |
| `fields[0]`, `fields[1]`                   | `title`, `slug`               | Restrict top-level fields for lightweight list calls.                                      |
| `pagination[page]`, `pagination[pageSize]` | `1`, `100`                    | Default page size is 25, maximum 100.                                                      |
| `sort`                                     | `title:asc`                   | Any top-level field.                                                                       |

Do not pass a `status` parameter. Only published content is intended for external use.

## Examples

Use single quotes in the shell so `$eq` is not expanded.

List all methodologies with their product:

```bash
curl 'https://cms.service.auroraer.com/api/methodologies?populate[product]=true'
```

Lightweight list for one product (title and slug only):

```bash
curl -G 'https://cms.service.auroraer.com/api/methodologies' \
  --data-urlencode 'filters[product][name][$eq]=Amun' \
  --data-urlencode 'fields[0]=title' \
  --data-urlencode 'fields[1]=slug' \
  --data-urlencode 'fields[2]=summary' \
  --data-urlencode 'fields[3]=version'
```

One methodology by slug with all chapters and blocks:

```bash
curl -G 'https://cms.service.auroraer.com/api/methodologies' \
  --data-urlencode 'filters[slug][$eq]=YOUR-SLUG' \
  --data-urlencode 'populate[product]=true' \
  --data-urlencode 'populate[chapters][populate][regions]=true' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.text-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.image-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.image-text-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.table-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.video-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.cta-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][chart.chart-editor-block][populate]=*' \
  --data-urlencode 'populate[chapters][populate][blocks][on][shared.accordion-block][populate][items][populate][body][populate]=*'
```

Japanese version of the same document. There is no automatic fallback, so request `en` separately if the `ja` result is empty:

```bash
curl -G 'https://cms.service.auroraer.com/api/methodologies' \
  --data-urlencode 'locale=ja' \
  --data-urlencode 'filters[slug][$eq]=YOUR-SLUG' \
  --data-urlencode 'populate[product]=true'
```

Same request from JavaScript:

```js
const params = new URLSearchParams({
	"filters[slug][$eq]": "YOUR-SLUG",
	"populate[product]": "true",
	"populate[chapters][populate][regions]": "true",
	"populate[chapters][populate][blocks][on][shared.text-block][populate]": "*",
	"populate[chapters][populate][blocks][on][shared.image-block][populate]": "*",
});
const res = await fetch(
	`https://cms.service.auroraer.com/api/methodologies?${params}`,
);
const { data } = await res.json();
const methodology = data[0];
```

## Response shape

```jsonc
{
	"data": [
		{
			"id": 12,
			"documentId": "k3f9x2...",
			"title": "Battery revenue methodology",
			"slug": "battery-revenue-methodology",
			"version": "2.1",
			"summary": "How Aurora models ...",
			"locale": "en",
			"createdAt": "2026-08-01T10:00:00.000Z",
			"updatedAt": "2026-08-30T09:12:44.000Z",
			"publishedAt": "2026-08-30T09:12:44.000Z",
			"product": { "id": 3, "documentId": "...", "name": "Amun" },
			"chapters": [
				{
					"id": 41,
					"title": "Overview",
					"version": null,
					"summary": null,
					"accessGroups": null,
					"regions": [
						{ "id": 2, "documentId": "...", "name": "Great Britain", "code": "GBR" },
					],
					"blocks": [
						{
							"__component": "shared.text-block",
							"id": 90,
							"body": [
								/* rich text blocks */
							],
						},
						{
							"__component": "shared.image-block",
							"id": 91,
							"caption": "Figure 1",
							"alignment": "center",
							"width": "content",
							"image": {
								"url": "https://...amazonaws.com/...?X-Amz-Signature=...",
								"mime": "image/png",
								"width": 1200,
								"height": 600,
								"alternativeText": null,
								"formats": { "thumbnail": { "url": "..." }, "small": { "url": "..." } },
							},
						},
					],
				},
			],
		},
	],
	"meta": {
		"pagination": { "page": 1, "pageSize": 25, "pageCount": 1, "total": 1 },
	},
}
```

Chapters are ordered as they appear in the CMS. Render them in array order.

### Block types

Every item in `chapters[].blocks[]` carries a `__component` discriminator:

| `__component`              | Key fields                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `shared.text-block`        | `body` (Strapi rich-text blocks JSON)                                                                        |
| `shared.image-block`       | `image`, `caption`, `alignment` (`left`/`center`/`right`), `width` (`content`/`wide`/`full`)                 |
| `shared.image-text-block`  | `image`, `heading`, `eyebrow`, `body`, `caption`, `imagePosition` (`left`/`right`), `width` (`split`/`wide`) |
| `shared.table-block`       | `table_data` (JSON grid), `caption`                                                                          |
| `shared.video-block`       | `video`, `caption`                                                                                           |
| `shared.cta-block`         | `heading`, `body`, `link_label`, `link_url`                                                                  |
| `chart.chart-editor-block` | `chart_title`, `chart_data` (JSON: series, categories and chart options)                                     |
| `shared.accordion-block`   | `allowMultipleOpen`, `items[]` each with `title`, `defaultOpen`, `body[]` (nested blocks of the types above) |

`body` fields use the Strapi Blocks rich-text format. In React, `@strapi/blocks-react-renderer` renders it directly. Otherwise map the node types (`paragraph`, `heading`, `list`, `link`, `image`, `code`, `quote`) to HTML.

Ignore `accessGroups` on chapters. It is not enforced on this API.

## Media URLs

Images, videos and files are served from a private bucket via pre-signed URLs that expire one hour after the response is generated. Do not store `url` values. Re-fetch the document when you need a fresh URL, or proxy media through your own cache with a TTL under one hour.

## Caching and rate limits

There are no explicit rate limits. Content changes infrequently, so cache responses on your side for at least a few minutes and avoid per-page-view calls where possible.

## Errors

Standard Strapi error envelope:

```json
{
	"data": null,
	"error": {
		"status": 400,
		"name": "ValidationError",
		"message": "...",
		"details": {}
	}
}
```

| Status | Meaning                                                           |
| ------ | ----------------------------------------------------------------- |
| 400    | Malformed filter or populate parameter                            |
| 403    | Endpoint not yet enabled for anonymous access in that environment |
| 404    | Unknown `documentId`                                              |
