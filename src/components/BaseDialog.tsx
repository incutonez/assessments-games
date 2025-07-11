import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Dialog as AriaDialog, type DialogProps, Heading, Modal as AriaModal } from "react-aria-components";
import classNames from "classnames";
import { BaseButton } from "@/components/BaseButton.tsx";

export interface BaseDialogProps extends DialogProps {
	title?: string;
	open?: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	footerSlot?: ReactNode;
	children?: ReactNode;
	onCancel?: () => void;
}

export function BaseDialog({ children, title, footerSlot, open = false, setOpen, onCancel, className = "size-1/2", ...props }: BaseDialogProps) {
	className = classNames("absolute bg-white shadow-lg border rounded border-gray-500 top-0 left-0 bottom-0 right-0 m-auto", className);

	function onClickCancel() {
		setOpen(false);
		if (onCancel) {
			onCancel();
		}
	}

	return (
		<AriaModal
			className={className}
			isOpen={open}
		>
			<AriaDialog
				{...props}
				className="flex flex-col size-full"
			>
				<Heading>
					{title}
				</Heading>
				<article className="flex items-center justify-center flex-1">
					{children}
				</article>
				<footer className="ml-auto p-2 flex space-x-2">
					{footerSlot}
					<BaseButton
						onClick={onClickCancel}
						text="Cancel"
					/>
				</footer>
			</AriaDialog>
		</AriaModal>
	);
}
