"use client";

import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function CryptoCalculatorCard() {
	const [formData, setFormData] = useState({
		riskAmount: "",
		actualRisk: "",
		entryPrice: "",
		stopLossPrice: "",
		direction: "long",
	});
	const [leverage, setLeverage] = useState(0);

	function updateFormData(field: string, newValue: string): void {
		setFormData((prevData) => ({
			...prevData,
			[field]: newValue,
		}));
	}

	function calculateRisk() {
		let riskMoveSize = 0;

		if (formData.direction === "long") {
			riskMoveSize =
				(Number(formData.entryPrice) / Number(formData.stopLossPrice)) * 100 -
				100;
		} else {
			riskMoveSize = // percentage difference in entry price to stop loss price
				(Number(formData.stopLossPrice) / Number(formData.entryPrice)) * 100 -
				100;
		}

		let newLeverage = 100 / riskMoveSize || 0;
		if (newLeverage < 1) {
			newLeverage = 1;
		}

		const actualRisk = riskMoveSize/100 * Math.floor(newLeverage) * Number(formData.riskAmount);
		console.log("size " + formData.riskAmount, "riskSize " + riskMoveSize, "lev " + newLeverage);

		updateFormData('actualRisk', actualRisk.toString());
		setLeverage(newLeverage);
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
						<div className="flex flex-row items-center justify-center mb-1.5">
							<p className="text-xl font-extrabold text-emerald-700 underline">
								{Math.floor(leverage)}x Leverage
							</p>
							<p className="pt-0.5 text-lg font-bold">&nbsp;to Risk&nbsp;</p>
							<p className="text-xl font-bold text-emerald-700">
								${Number(formData.actualRisk).toFixed(2)}!
							</p>
						</div>
					)}
					<Button className="font-bold" onClick={() => calculateRisk()}>
						Calculate!
					</Button>
				</div>
			</div>
		</div>
	);
}
