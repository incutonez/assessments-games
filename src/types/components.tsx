import type { ElementType } from "react";
import type { ButtonProps } from "react-aria-components";
import type { LinkProps } from "@tanstack/react-router";
import type { FileRoutesByTo } from "@/routeTree.gen.ts";

export interface BaseButtonProps extends ButtonProps {
	text?: string;
	icon?: ElementType;
	loading?: boolean;
}

export interface ButtonRouteProps extends LinkProps {
	text?: string;
	icon?: ElementType;
	loading?: boolean;
	// Taken from https://github.com/TanStack/router/discussions/824#discussioncomment-12342295
	route: keyof FileRoutesByTo;
	className?: string;
}
