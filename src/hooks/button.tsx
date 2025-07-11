import type { ReactNode } from "react";
import { BaseIcon } from "@/components/BaseIcon.tsx";
import { IconLoading } from "@/components/icons.tsx";
import type { BaseButtonProps } from "@/types/components.tsx";

export function useButtonIcon({ icon, loading }: BaseButtonProps) {
	let iconEl: ReactNode;
	if (loading) {
		iconEl = (
			<BaseIcon
				as={IconLoading}
				size="size-5"
			/>
		);
	}
	else if (icon) {
		iconEl = (
			<BaseIcon
				as={icon}
				size="size-5"
			/>
		);
	}
	return iconEl;
}
