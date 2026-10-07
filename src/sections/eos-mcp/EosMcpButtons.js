"use client";
// MODULES //

// COMPONENTS //
import Button from "@/components/Buttons/Button";

// DATA //
import { eosMcpConnectUrl, eosMcpDemoUrl } from "@/data/eosMcp";

/** ExternalButton — site Button wrapped in a new-tab link */
function ExternalButton({ href, mode, color, children }) {
	return (
		<a href={href} target="_blank" rel="noreferrer" role="button">
			<Button color={color} variant="filled" shape="rounded" mode={mode} textlowercase>
				{children}
			</Button>
		</a>
	);
}

/** ConnectButton — opens the MCP quick-start guide on EOS */
export function ConnectButton({
	href = eosMcpConnectUrl,
	mode,
	color = "primary",
	children = "Connect EOS MCP",
}) {
	return (
		<ExternalButton href={href} mode={mode} color={color}>
			{children}
		</ExternalButton>
	);
}

/** DemoButton — opens the Microsoft Bookings page */
export function DemoButton({
	href = eosMcpDemoUrl,
	mode = "dark",
	color = "primary",
	children = "Book a demo",
}) {
	return (
		<ExternalButton href={href} mode={mode} color={color}>
			{children}
		</ExternalButton>
	);
}
