import { Button as AriaButton } from "react-aria-components";
import { Link } from "@tanstack/react-router";
import { useButtonIcon } from "@/hooks/button.tsx";
import type { BaseButtonProps, ButtonRouteProps } from "@/types/components.tsx";

export function BaseButton({ text, icon, loading = false, ...props }: BaseButtonProps) {
	const iconEl = useButtonIcon({
		loading,
		icon,
	});
	return (
		<AriaButton
			className="base-button"
			{...props}
		>
			{iconEl}
			{text}
		</AriaButton>
	);
}

export function ButtonRoute({ text, route, icon, loading = false, ...props }: ButtonRouteProps) {
	const iconEl = useButtonIcon({
		loading,
		icon,
	});

	return (
		<Link
			to={route}
			className="base-button"
			{...props}
		>
			{iconEl}
			{text}
		</Link>
	);
}
