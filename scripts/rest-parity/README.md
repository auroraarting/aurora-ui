# REST parity checks

Tooling for the GraphQL → REST migration in `src/services/rest/`.

```bash
npm run rest:parity          # every converted page, GraphQL vs REST
npm run rest:parity service  # just the cases whose label contains "service"
npm run rest:audit           # ACF field names the sections cannot read
```

Both scripts talk to the live CMS. They read `.env.local`, and they go through
the same p-limit queue as the app, so set `WP_REST_CONCURRENCY=1
WP_REST_PAUSE_MS=500` if Pressable starts returning 429s.

## rest:parity

Calls the old GraphQL service and the new REST service for the same slug and
compares both the **shape** and the **values**. The live query is the
reference, so nothing has to be retyped.

- **Extra fields in REST are expected.** REST returns a whole ACF group where
  GraphQL selected individual fields.
- **`type-mismatch` is informational.** The known cases are numeric IDs where
  WPGraphQL returned base64 global IDs. Nothing reads those as opaque strings —
  the utils only test them for truthiness or use them to de-duplicate, so node
  `id` paths are filtered out of the value comparison.
- A field GraphQL selected that nothing in `src/` reads is listed in
  `accepted` in `verify-pages.mjs` rather than reproduced.

Add a case per page as you convert it.

**Compare values, not just shape.** The value comparison was added after a
shape-only pass reported 24/24 while the rendered pages still differed: every
WYSIWYG field was missing its `<p>` wrapper and its curly quotes. Shape parity
is necessary and nowhere near sufficient.

**A set comparison cannot see order.** A whole-page multiset is right for
ignoring Suspense reshuffles but blind to ordering — a `<select>` whose options
moved holds exactly the same strings. The country dropdown came back
newest-first instead of alphabetical and only the value comparison caught it,
because it compares by path. Diff `<main>` as a sequence to get order back.

## rest:audit

Runs the real `shapeAcf` over live ACF payloads for every post type and checks
that each field name it produces appears somewhere in `src/`. A name that does
not is a field the sections cannot see.

This is how three naming bugs were found, all silent — the value simply
rendered empty:

| ACF key over REST      | shapeAcf gave | sections read      |
| ---------------------- | ------------- | ------------------ |
| `financing_&M&a`       | `financingMA` | `financingMA` ✓    |
| `4_step_process`       | `4StepProcess`| `fourStepProcess`  |
| `""` (blank name)      | dropped       | `insights`         |

The first is why `camelKey` splits on every non-alphanumeric run rather than
just `_` and `-`; the second is in `acfFieldNames`; the third is why a blank
field name falls back to the field's label, as WPGraphQL did.

## Converting another page

1. Write `src/services/rest/<Page>.service.js`. Most CPT singles are a few
   lines over `getSingleBySlug` — pass the ACF field-group name WPGraphQL used
   (`services`, `whoAreYous`, `howWeHelpInside`), because the sections read
   that path. Only add `relations` for relationship fields beyond the four in
   `Relations.service.js`.
2. Add a case to `verify-pages.mjs` and run `npm run rest:parity` until the
   page reports `nothing missing`.
3. Point the page at the REST services, drop `export const revalidate`, and
   unwrap the props (REST services return nodes directly; `getRegions` keeps
   its `data.regions` envelope because the map helpers walk it).
4. Render the page before and after with `next dev` and diff the text inside
   `<main>` **as a sequence**. That excludes the header and footer, which
   stream in a different order between runs and otherwise drag a whole-page
   sequence diff down to ~0.78 similarity on identical content. Comparing
   `<main>` gives an exact ordered match, and the heading sequence
   (`<h1>`–`<h6>` in order) is a good second check. A whole-page multiset is
   the fallback, but it cannot see ordering — see below.

## Watch for

- **WordPress's content filters live on `<field>_source.formatted_value`.**
  WPGraphQL inherited `wptexturize` and `wpautop`; the plain `acf` key is raw.
  Rather than reimplement those filters, `shapeAcf` reads string values from
  the formatted mirror ACF already publishes next to every field. Two traps
  follow from that:
  - `_fields=acf.banner` does **not** include `acf.banner_source`.
    `Rest.service.js` adds the sibling automatically (`acfSourceFor`), because
    without it text still renders — just unwrapped, with straight quotes.
  - `shapeAcf(acf.someGroup)` loses it too, since the sibling is on the
    *parent*. Shape the whole payload, or use `shapeAcfField(acf, "someGroup")`.
- `_fields` is worth using — it took the country payload from 3.6 MB to 200 KB,
  under the Data Cache's per-entry limit — but a registered field computed from
  another field returns `null` if `_fields` trims its dependency.
  `featured_image_url` needs `featured_media`; `Rest.service.js` adds that back
  centrally, in `fieldDependencies`.
- REST does not decode HTML entities in titles and GraphQL did, so plain text
  goes through `text()`. `content` keeps its entities, because it is HTML.
- **Falsy ACF values were all `null` over GraphQL** — `false` for an image,
  `""` for text, `0` for a numeric select (the bundles columns store 0 for "not
  included"). `shapeAcf` collapses all three, and sections already branch on
  null.
- **Except a real `false` on a true/false field**, which GraphQL kept. The two
  are told apart by `<field>_source.type`, available only for top-level fields;
  nested ones are listed in `acfBooleanFields` in `shape.js`.
- **Ordering is not free.** WPGraphQL's defaults are not REST's: `/country`
  returns newest-first where the GraphQL query asked for TITLE ASC, and terms
  that share a name tie-break by *descending* id in WPGraphQL and ascending in
  REST. See `orderTermsLikeGraphql` in `rest/Insights.service.js`.
- **ACF date pickers need converting.** The raw value is `Ymd` (`20251220`) and
  the formatted mirror is the field's display format (`20/12/2025`), but
  WPGraphQL returned ISO 8601. The careers popup passes the value straight to
  `formatDate`, i.e. `new Date(value)`, so the display format reaches the page
  as **"Invalid Date"**. `isoDate` in `shape.js` spots the pair — eight-digit
  raw *and* slash-formatted counterpart — and emits ISO.
- Never memoise in front of `fetch`. The second caller gets a promise instead
  of a fetch, so its page never registers the cache tags and on-demand
  revalidation silently stops working for it.

## Known, accepted differences

- Node `id` is numeric over REST and a base64 global id over WPGraphQL.
- `featured_image_url` carries no alt text, so `featuredImage.node.altText` is
  `""` — which is what WPGraphQL returned for these attachments anyway. The
  real alt would need a `/media` call per attachment.
- `postFields.sections[].content` differs by one paragraph boundary inside a
  `[caption]` shortcode: WPGraphQL's `the_content` pass closes the `<p>` before
  the caption's own `<p>` and ACF's formatting does not. It affects the
  insight detail page, which is not yet converted.
