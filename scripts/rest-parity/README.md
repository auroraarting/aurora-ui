# REST parity checks

Tooling for the GraphQL → REST migration in `src/services/rest/`.

```bash
npm run rest:parity          # every converted page, GraphQL vs REST
npm run rest:parity service  # just the cases whose label contains "service"
npm run rest:audit           # ACF field names the sections cannot read
npm run rest:tags            # cache tags on every fetch — static, no network
npm run rest:tags:live       # …and capture what the wrapper really assembles
```

`rest:tags` is the one to run habitually: it reads the sources, touches
nothing, and returns instantly.

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

**The shape diff unions keys across every array element.** It used to sample
index 0 only, which hid a relation that is null on the first repeater row and
populated on later ones (`whyAttend.agenda[].speaker` on events) — the suite
reported parity while a whole speaker list was missing from the rendered page.
When adding a service, scan the raw ACF for integer arrays at *any* depth and
*any* index; that is what a relation looks like:

```js
// every integer array in an ACF payload, however deep
const scan = (o, p = "") =>
  Array.isArray(o)
    ? o.every((x) => Number.isInteger(x)) && o.length
      ? console.log(p, o.slice(0, 4))
      : o.forEach((x) => scan(x, p + "[]"))
    : o && typeof o === "object"
      ? Object.entries(o).forEach(([k, v]) => !k.endsWith("_source") && scan(v, p ? `${p}.${k}` : k))
      : undefined;
```

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

## rest:tags

Tags are the only thing that makes content refresh, so a fetch with a wrong or
missing tag is a page that silently goes stale forever — invisible to a parity
run, which only compares data.

The default pass is **static**: it reads every call to `RESTAPI`, `restAll`,
`restByIds` and `restRequest` across the service layer and flags four faults —

- no `apiID` and no `tags`, so the fetch can never be revalidated
- an `apiID` that is not in `contentTags`, so no webhook will ever match it
- a `?slug=` read that does not pass `slug`, so it only gets a collection tag
- an `?include=` read that does not pass `ids`, likewise

It understands long-hand (`apiID: "posts"`), shorthand (`{ apiID }`) and
spread-in options, and strips `${…}` interpolations first — without that,
`?slug=${slug}` in a URL reads as a shorthand `{ slug }` property and masks the
third fault. The checker was validated by injecting one of each fault and
confirming all four are reported.

`rest:tags:live` additionally calls every service and prints what the wrapper
actually assembled, which is worth doing after changing `tagsFor` itself.

**There is no global "everything" tag.** One used to be added to every fetch,
which meant a single webhook could invalidate the whole site and made it
tempting to fire that instead of naming what changed. `/api/revalidate` with
no arguments still purges everything, but by fanning out over the 30 content
tags explicitly, so the cost lives at the call site rather than on every cache
entry.

Tags come in three shapes, and **a webhook should send all three**:

| tag | matches | so it is what makes… |
| --- | --- | --- |
| `post` | listings, anything reading the collection | a new or deleted item appear |
| `post:my-slug` | that item's own page | an edit show on its page |
| `post#123` | the batched by-id fetches behind ACF relation pickers | an edit show wherever it is referenced |

The id form exists because the two halves of the system name things
differently: a page is addressed by slug, while a relation field stores post
ids and never sees a slug. WordPress knows both on save.

### A fetch that names its items does not get the content-type tag

This is the rule that keeps one edit cheap, and it is the one to understand
before touching `tagsFor`.

`posts?slug=my-article` depends on exactly one post, so `posts:my-article` is
enough. Adding the bare `posts` tag as well would mean all **644** single-post
cache entries — 458 insight pages plus 186 press-room pages — went stale
whenever *any* post was edited. Measured: one insight detail page is 14 REST
calls, of which only its own `posts?slug=` and its 3-item teaser carry a post
tag, so the amplification was ~643 wasted calls per edit, not 644 × 14.

| one post is edited | upstream calls to re-warm | detail pages re-rendered |
| --- | --- | --- |
| with the collection tag on single-post fetches | ~669 | 644 |
| without it (current) | ~26 | 1 |

Counts behind those figures, from `x-wp-total` on 2026-09-11: 820 posts in all,
458 in the six insight categories (10 listing pages at `per_page=50`), 186 in
`media` (4 listing pages). Videos, podcasts and webinars are separate post
types with their own tags, so a post edit never touches them.

The content-type tag belongs only on a fetch whose *result set* can change — an
unfiltered or filtered collection read, where a new or deleted item alters the
answer. Those keep it automatically, because they name no items. A fetch that
names items *and* can change for other reasons can force it back with
`collection: true`.

**This makes the item tags mandatory in the webhook.** Sending only `post` will
no longer refresh an individual article's page. Send all three.

Verified end to end: purging `service:origin` left `/service/advisory` cached
(5.8s) while `service:advisory` refetched it (8.7s), `category#217` refetched
it, and `alldata` now does nothing at all.

Two deliberate limits. Id tags are only added while a batch is small
(`maxIdTags`, 32) because Next caps tags per fetch — a larger batch keeps its
collection tag and is invalidated collection-wide. And a fetch spanning several
collections, like `/aurora/v1/filter-options`, carries one tag per collection
rather than an apiID.

## The site's own REST namespace

`aurora/v1` is already installed on the CMS and supplies two things wp/v2
cannot. Prefer them over rebuilding the same data from collections:

- **`/aurora/v1/languages`** — WPML's language list, with the same fields
  WPGraphQL's `languages` root field returned. wp/v2 has no equivalent: a
  post's `translations` only names the languages *that post* is translated
  into. Wrapped by `rest/Languages.service.js`.
- **`/aurora/v1/filter-options`** — the six filter lists (tags, categories,
  countries, products, softwares, services) in one request instead of six.
  Wrapped by `rest/FilterOptions.service.js`.

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
- **Watch the 2 MB Data Cache limit per fetch.** Next.js logs `items over 2MB
  can not be cached` and then serves that fetch **uncached** — so every request
  re-fetches it, which is the load this migration exists to remove. It bit the
  webinar listing (`context=edit` returns `raw` *and* `rendered` for title and
  content: ~2.5 MB per 100) and nearly bit the insights listing (~1.2 MB per
  100). Both now paginate smaller — `listingPerPage` in `rest/Webinar.service.js`,
  `per_page=50` in `rest/Insights.service.js`. Grep the dev log for `over 2MB`
  after converting any listing.
- **`content(format: RAW)` needs `context=edit`.** REST only exposes
  `content.raw` there, and it requires AUTH_TOKEN to be valid for editing. Use
  `raw()` from shape.js. Check which form the old query actually asked for —
  the webinar *listing* wanted RAW and the *detail* page wanted the filtered
  output.
- **A page addressed by database id may be addressed by a stale one.**
  `pages?include=<id>` returns an empty list where `pages/<id>` 404s and the
  wrapper throws; `getPageGroupById` uses the former so a missing id degrades
  to null the way WPGraphQL did.
- **Check every `generateStaticParams`.** They are easy to miss when converting
  a page, and one left holding a GraphQL argument string returns `undefined`
  rather than throwing — Next then fails with `result is not iterable` from
  `buildAppStaticPaths`, which names neither your service nor your page.
- Never memoise in front of `fetch`. The second caller gets a promise instead
  of a fetch, so its page never registers the cache tags and on-demand
  revalidation silently stops working for it.
- **Post types are not named after their GraphQL field.** Webinars are the
  `tribe_events` post type — The Events Calendar's CPT, registered here with
  the label "Webinars" — and there is no `webinar` post type at all. Check
  `/wp/v2/types` rather than guessing a rest_base.
- **A post's terms come back name-ordered from WPGraphQL**, not in the order
  the post stores them, and ties break by *descending* id. This CMS has two
  categories called "NORAM" and two called "Alberta", so without the tie-break
  they come back swapped. Handled in `termNodes`.
- **WPML scopes every query to one language.** Asking for a translated post's
  id from the default context returns an empty list, not the post — you need
  `?wpml_language=<code>`. (`?lang=` is the wrong parameter: it unregisters the
  custom post types entirely.)
- **`our_clients` is `ourClient` on services but `ourClients` on country.**
  WPGraphQL's name for the same ACF key differs per post type, so the global
  `acfFieldNames` default is overridable per call — `getSingleBySlug` takes a
  `rename` option.
- **`resolveRelations` addresses fields by a dotted path, so it cannot reach
  into a repeater.** A relation inside a repeater row (`speakers.speakers[]
  .speakers`, `categories[].leader`, `map.markers[].category`) has to be
  gathered across the rows and resolved separately — passing the repeater to a
  relation resolver reads its rows as ids and quietly nulls the field.
- **Object key order can be load-bearing.** WPGraphQL returns a group's fields
  in the *query's* selection order; ACF returns them in field order. The events
  page sorts its sections with `Object.entries(sectionOrders).sort((a,b) =>
  a[1]-b[1])`, and two values tie because `whyattend` is stored as the string
  `"3"` while `speakers` is the number `3` — so the tie falls back to key order
  and a whole section moved, taking 16 speaker photographs with it. Pinned in
  `rest/Events.service.js`; the real fix is to store that field as a number.
- **`_source` siblings roughly multiply an ACF payload.** They carry the
  formatted text, so they are not optional — but they took the events listing
  to 3.0 MB and the regions country fetch to 2.2 MB, both over the cache limit.
  Measure a listing *after* the wrapper has added them, not before.
- **Pressable throttles hard.** A 429 gets 5 attempts (~75s of backoff) rather
  than 3, because a build and a page render at the same time exhausted three.
  Run the parity script and any rendering one at a time, or both will 429.

## Not converted, and why

**`/software/[slug]/[language]` and `/global-presence/[slug]/[language]`.**
Their merge expects each translation to be a whole node, and WPGraphQL nests
them three deep: the post's own translated node, and inside it every
*relation's* translated node — a case study's `translations[0]` carries that
case study's translated `content`, `date`, `featuredImage` and `postFields`.

REST's `translations` is a stub (id, slug, language). Following one is a
request; following them all is one request per related post per language —
roughly 60 extra for a software with ~50 client logos, 5 testimonials and 5
case studies. The software's own translation and the country list are cheap and
were built; the nested relation translations are not.

The fix is server-side, alongside the two routes already in `aurora/v1`: an
endpoint returning a post with its translations expanded, the way
`filter-options` returns six collections in one request. See the note at the
foot of `rest/Softwares.service.js`.

## Known, accepted differences

- Node `id` is numeric over REST and a base64 global id over WPGraphQL.
- `featured_image_url` carries no alt text, so `featuredImage.node.altText` is
  `""` — which is what WPGraphQL returned for these attachments anyway. The
  real alt would need a `/media` call per attachment.
- **WPML media translations are not on wp/v2.** `/media` reports
  `translations: []` for every attachment sampled (300+), while WPGraphQL
  reports a `ja` entry for 36 of 44 event banners. Those entries point at the
  *same file* as the default and the rendered pages are identical, so nothing
  is lost visually — but the field cannot be reproduced without a server-side
  addition. Note that a post's own `translations` *is* exposed and is used
  throughout; this gap is specific to attachments.
- `postFields.sections[].content` differs by one paragraph boundary inside a
  `[caption]` shortcode. At tag level the whole difference is a stray `</p>` in
  the GraphQL output with no `<p>` open to close. Rendered, that malformed
  markup becomes **one empty `<p>`** on the insight detail page which REST does
  not produce — visible text, media, `<img>` counts and `<main>` order are
  otherwise identical. REST's output is the better-formed of the two.
