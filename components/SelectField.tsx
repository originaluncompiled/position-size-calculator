import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function SelectField({
	text,
	value,
	field,
	options,
	updateData,
}: {
	text: string;
	value: string;
	field: string;
	options: { [label: string]: string };
	updateData: (field: string, newValue: string) => void;
}) {
	const handleChange = (newValue: string) => {
		updateData(field, newValue);
	};

	return (
		<div className="flex flex-row w-full pb-2">
			<Label className="w-4/5 font-semibold pt-2">{text}</Label>

			<Select value={value} onValueChange={(value) => handleChange(value)}>
				<SelectTrigger className="w-3/5 md:w-2/5 border-b-neutral-400 bg-neutral-300">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="border-b-neutral-400 bg-neutral-300">
					{Object.keys(options).map((key, i) => {
						return (
							<SelectItem value={key} key={key + i}>
								{key}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}
