"use client";

// MODULES //
import { forwardRef } from "react";

// PLUGINS //
import Vimeo from "@u-wave/react-vimeo";

/**
 * VimeoPlayer
 *
 * Thin wrapper around `@u-wave/react-vimeo` that forces Vimeo's Do Not Track
 * mode on every embed. With `dnt` the player sets no tracking/analytics
 * cookies, which is what lets `player.vimeo.com` sit in the "Necessary"
 * category in the CookieYes dashboard instead of being auto-blocked until
 * consent. Import this instead of `@u-wave/react-vimeo` directly so a new
 * embed can never ship without DNT.
 *
 * Props are passed straight through, and the ref resolves to the underlying
 * Vimeo class instance so `ref.current.player` keeps working.
 */
const VimeoPlayer = forwardRef(function VimeoPlayer(props, ref) {
	return <Vimeo ref={ref} {...props} dnt />;
});

export default VimeoPlayer;
