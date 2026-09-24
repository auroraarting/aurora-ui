// Structural diff between a GraphQL response and the REST-shaped equivalent.
// Reports paths missing on either side and leaf values that disagree.

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

export function walk(value, path = "", out = new Map()) {
	if (Array.isArray(value)) {
		out.set(path + "[]", `array(${value.length})`);
		// Every element, collapsed onto one `[0]` path: the union of their keys,
		// not just the first element's. Sampling index 0 alone hid a relation
		// (`whyAttend.agenda[].speaker`) that is null on the first agenda row
		// and populated on later ones — the shape diff passed while a whole
		// speaker list was missing from the page.
		for (const item of value) walk(item, path + "[0]", out);
	} else if (isObj(value)) {
		for (const k of Object.keys(value).sort()) {
			walk(value[k], path ? `${path}.${k}` : k, out);
		}
	} else {
		out.set(path, value === null ? "null" : typeof value);
	}
	return out;
}

/** Every leaf value by path, for value-level comparison. Unlike walk(), this
 *  descends into every array element, because a difference in the third item
 *  of a list matters as much as one in the first. */
export function leaves(value, path = "", out = new Map()) {
	if (Array.isArray(value)) {
		value.forEach((item, index) => leaves(item, `${path}[${index}]`, out));
	} else if (isObj(value)) {
		for (const k of Object.keys(value).sort()) {
			leaves(value[k], path ? `${path}.${k}` : k, out);
		}
	} else {
		out.set(path, value);
	}
	return out;
}

export function compare(gql, rest, { label = "" } = {}) {
	const a = walk(gql);
	const b = walk(rest);
	const onlyGql = [...a.keys()].filter((k) => !b.has(k));
	const onlyRest = [...b.keys()].filter((k) => !a.has(k));
	const typeMismatch = [...a.keys()]
		.filter((k) => b.has(k) && a.get(k) !== b.get(k))
		.map((k) => `${k}: gql=${a.get(k)} rest=${b.get(k)}`);

	// Values, not just shape. A field present on both sides with different text
	// is the failure mode a shape diff cannot see — it is how the missing
	// wptexturize pass stayed hidden until the pages were rendered.
	const la = leaves(gql);
	const lb = leaves(rest);
	const valueMismatch = [...la.keys()]
		.filter((k) => lb.has(k) && la.get(k) !== lb.get(k))
		.map((k) => ({ path: k, gql: la.get(k), rest: lb.get(k) }));

	console.log(`\n===== ${label} =====`);
	console.log(`paths: gql=${a.size} rest=${b.size}`);
	const show = (title, list) => {
		console.log(`\n${title} (${list.length}):`);
		for (const item of list.slice(0, 60)) console.log("  " + item);
		if (list.length > 60) console.log(`  … ${list.length - 60} more`);
	};
	show("MISSING IN REST", onlyGql);
	show("EXTRA IN REST", onlyRest);
	show("TYPE MISMATCH", typeMismatch);
	show(
		"VALUE MISMATCH",
		valueMismatch.map(
			({ path, gql: g, rest: r }) =>
				`${path}\n      gql : ${JSON.stringify(g)?.slice(0, 160)}\n      rest: ${JSON.stringify(r)?.slice(0, 160)}`,
		),
	);
	return { onlyGql, onlyRest, typeMismatch, valueMismatch };
}

export async function graphql(query) {
	const res = await fetch(process.env.API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
		},
		body: JSON.stringify({ query }),
	});
	const json = await res.json();
	if (json.errors) console.error("GraphQL errors:", JSON.stringify(json.errors).slice(0, 500));
	return json.data;
}
