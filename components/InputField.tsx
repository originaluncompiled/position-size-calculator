import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function InputField({
	text,
	inputCharacter,
	characterSide,
	placeholder,
	value,
	field,
	updateData,
}: {
	text: string;
	inputCharacter?: string;
	characterSide?: "left" | "right";
	placeholder?: string;
	value: string;
	field: string;
	updateData: (field: string, newValue: string) => void;
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		updateData(field, e.target.value);
	};

	return (
		<div className="flex flex-row w-full pb-2">
			<Label htmlFor="entry-price" className="w-4/5 font-semibold pt-2">
				{text}
			</Label>

			{characterSide === "left" && (
				<p className="font-semibold pr-2 pt-2 text-black">{inputCharacter}</p>
			)}
			<Input
				id="entry-price"
				className="w-2/5 border-b-neutral-400 bg-neutral-300"
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			{characterSide === "right" && (
				<p className="font-semibold pl-2 pt-2 text-black">{inputCharacter}</p>
			)}
		</div>
	);
}
