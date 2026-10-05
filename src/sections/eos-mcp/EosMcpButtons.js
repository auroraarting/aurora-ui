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
export function ConnectButton({ mode, color = "primary", children = "Connect EOS MCP" }) {
	return (
		<ExternalButton href={eosMcpConnectUrl} mode={mode} color={color}>
			{children}
		</ExternalButton>
	);
}

/** DemoButton — opens the Microsoft Bookings page */
export function DemoButton({ mode = "dark", color = "primary" }) {
	return (
		<ExternalButton href={eosMcpDemoUrl} mode={mode} color={color}>
			Book a demo
		</ExternalButton>
	);
}
