"use client";

import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function CryptoCalculatorCard() {
	const [formData, setFormData] = useState({
		riskAmount: "",
		entryPrice: "",
		stopLossPrice: "",
		maxLeverage: "",
		direction: "long",
	});
	const [leverage, setLeverage] = useState(0);
	const [capitalRequired, setCapitalRequired] = useState(0);
	const [positionSize, setPositionSize] = useState(0);

	function updateFormData(field: string, newValue: string): void {
		setFormData((prevData) => ({
			...prevData,
			[field]: newValue,
		}));
	}

	function calculateRisk() {
		const riskMoveSize = Math.abs(
			(Number(formData.entryPrice) - Number(formData.stopLossPrice) * (0.03 / 100)) / //add a 0.03% buffer to account for slippage/spreads
			Number(formData.entryPrice),
		);

		const positionSize = (Number(formData.riskAmount) * (0.03 / 100)) / riskMoveSize;

		let newLeverage = positionSize / Number(formData.riskAmount);
		let capitalRequired = Number(formData.riskAmount);

		// 4. If leverage is too high, calculate how much capital you'd actually need
		if (newLeverage > Number(formData.maxLeverage)) {
			newLeverage = Number(formData.maxLeverage);
			capitalRequired = positionSize / newLeverage;
		}

		setLeverage(newLeverage);
		setCapitalRequired(capitalRequired);
		setPositionSize(positionSize);
	}

	async function copyToClipboard(text: string) {
		await navigator.clipboard.writeText(text);
	}

	return (
		<div className="flex flex-col items-center justify-center w-[90%] md:max-w-[25%] p-2 bg-neutral-200 border-2 border-neutral-400 rounded-2xl">
			<div className="bg-slate-700 px-4 py-2 rounded-lg">
				<h2 className="text-amber-50 font-bold text-xl text-center">
					Crypto Leverage Calculator
				</h2>
			</div>
			<Separator className="my-2 bg-neutral-300" />

			<div className="flex-1 w-full h-full pt-2 px-2">
				<SelectField
					text="Direction:"
					value={formData.direction}
					field="direction"
					options={{ Long: "long", Short: "short" }}
					updateData={updateFormData}
				/>

				<InputField
					text="Risk Amount:"
					placeholder="1000"
					inputCharacter="$"
					characterSide="left"
					value={formData.riskAmount}
					field="riskAmount"
					updateData={updateFormData}
				/>

				<Separator className="my-2 bg-neutral-300" />

				<InputField
					text="Max Leverage:"
					placeholder="50"
					inputCharacter="x"
					characterSide="right"
					value={formData.maxLeverage}
					field="maxLeverage"
					updateData={updateFormData}
				/>

				<Separator className="my-2 bg-neutral-300" />

				<InputField
					text="Entry Price:"
					inputCharacter="$"
					characterSide="left"
					value={formData.entryPrice}
					field="entryPrice"
					updateData={updateFormData}
				/>
				<InputField
					text="Stop Loss Price:"
					inputCharacter="$"
					characterSide="left"
					value={formData.stopLossPrice}
					field="stopLossPrice"
					updateData={updateFormData}
				/>

				<Separator className="my-2 bg-neutral-300" />

				<div className="flex flex-col items-center justify-center">
					{leverage > 0 && (
						<>
							<div className="flex flex-row items-center justify-center mb-1.5">
								<p
									onClick={() => copyToClipboard(capitalRequired.toFixed(2).toString())}
									className="text-xl font-extrabold text-emerald-700 underline cursor-grab active:text-emerald-300 select-none"
								>
									$
									{capitalRequired.toLocaleString("en-US", {
										minimumFractionDigits: 0,
										maximumFractionDigits: 2,
									})}
								</p>
								<p className="pt-0.5 text-lg font-bold">&nbsp;@&nbsp;</p>
								<p className="text-xl font-bold text-emerald-700">
									{Math.floor(leverage)}x Leverage
								</p>
							</div>

							<div className="flex flex-row items-center justify-center mb-1.5">
								<p className="pt-0.5 text-lg font-bold">For a&nbsp;</p>
								<p
									onClick={() => copyToClipboard(positionSize.toFixed(2).toString())}
									className="text-xl font-extrabold text-emerald-700 underline cursor-grab active:text-emerald-300 select-none"
								>
									$
									{positionSize.toLocaleString("en-US", {
										minimumFractionDigits: 0,
										maximumFractionDigits: 2,
									})}
								</p>
								<p className="pt-0.5 text-lg font-bold">&nbsp;Position Size</p>
							</div>
						</>
					)}
					<Button className="font-bold" onClick={() => calculateRisk()}>
						Calculate!
					</Button>
				</div>
			</div>
		</div>
	);
}
