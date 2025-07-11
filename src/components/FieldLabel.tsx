import { Label as AriaLabel } from "react-aria-components";

export function FieldLabel({ text }: { text: string }) {
	return (
		<AriaLabel className="text-sm uppercase text-slate-700 font-semibold mr-1">
			{text}
		</AriaLabel>
	);
}
