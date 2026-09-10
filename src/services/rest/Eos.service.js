import { mediaNode } from "./shape";
import { getPageGroup } from "./Single.service";

/**
 * /eos — the `eos` field group. Its only relationship fields are the shared
 * client-logo and testimonial pickers, which resolveRelations handles by
 * default.
 *
 * One field needs help: `eos_ai.logo` holds a plain URL rather than an
 * attachment row, and it has no ACF metadata sibling to say so, so shapeAcf
 * cannot tell it apart from any other URL field and leaves it a string. The
 * section reads `eosAi.logo.node.mediaItemUrl`, so it is wrapped here.
 *
 * @returns {Promise<any|null>} what the page previously read as
 *   `res.data.page.eos`
 */
export const getEosPage = async () => {
	const acf = await getPageGroup("eos");
	if (acf?.eosAi) acf.eosAi.logo = mediaNode(acf.eosAi.logo);
	return acf;
};
