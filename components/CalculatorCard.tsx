"use client";

import { useState } from "react";
import InputField from "./InputField";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function CalculatorCard() {
  const [formData, setFormData] = useState({
    accountBalance: "",
    riskPercentage: "",
    entryPrice: "",
    stopLossPrice: "",
    contractSize: "1",
  });
  const [lots, setLots] = useState(0);

  function updateFormData(field: string, newValue: string): void {
    setFormData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  }

  function calculateRisk() {
    const dollarRisk =
      (Number(formData.accountBalance) * Number(formData.riskPercentage)) / 100;
    const points =
      (Number(formData.entryPrice) - Number(formData.stopLossPrice)) *
      Number(formData.contractSize);
    const newLots = dollarRisk / points;

    setLots(newLots);
  }

  // asset name is actually a dropdown menu with different colours
  return (
	<div className="flex flex-col items-center justify-center w-[90%] md:max-w-1/4 p-2 bg-neutral-200 border-2 border-neutral-400 rounded-2xl">
      <div className="bg-slate-700 px-4 py-2 rounded-lg">
        <h2 className="text-amber-50 font-bold text-xl text-center">
          Lot Size Calculator
        </h2>
      </div>
      <Separator className="my-2 bg-neutral-300" />

      <div className="flex-1 w-full h-full pt-2 px-2">
        <InputField
          text="Account Balance:"
          inputCharacter="$"
          characterSide="left"
          placeholder="100,000.00"
          value={formData.accountBalance}
          field="accountBalance"
          updateData={updateFormData}
        />
        <InputField
          text="Risk Percentage:"
          placeholder="2"
          inputCharacter="%"
          characterSide="right"
          value={formData.riskPercentage}
          field="riskPercentage"
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
        <InputField
          text="Contract Size:"
          placeholder="1"
          value={formData.contractSize}
          field="contractSize"
          updateData={updateFormData}
        />

        <Separator className="my-2 bg-neutral-300" />

        <div className="flex flex-col items-center justify-center">
          {lots > 0 && (
            <div className="flex flex-row items-center justify-center mb-1.5">
              <p className="text-xl font-extrabold text-emerald-700 underline">
                {lots.toFixed(2)} Lots
              </p>
              <p className="pt-0.5 text-lg font-bold">&nbsp;to Risk&nbsp;</p>
              <p className="text-xl font-bold text-emerald-700">
                $
                {(Number(formData.accountBalance) *
                  Number(formData.riskPercentage)) /
                  100}
                !
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
