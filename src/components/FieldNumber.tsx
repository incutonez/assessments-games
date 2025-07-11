import { Input as AriaInput, NumberField, type NumberFieldProps } from "react-aria-components";
import { FieldLabel } from "@/components/FieldLabel.tsx";

export function FieldNumber({ label, ...props }: NumberFieldProps & {label: string}) {
	return (
		<NumberField {...props}>
			<FieldLabel text={label} />
			<AriaInput className="w-12 disabled:pointer-events-none disabled:opacity-60 border outline-0 border-gray-500 focus:border-sky-600 px-2 text-sm h-8" />
		</NumberField>
	);
}
