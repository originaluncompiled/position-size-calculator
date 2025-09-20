"use client";

import CryptoCalculatorCard from "@/components/CryptoCalculatorCard";
import LotCalculatorCard from "@/components/LotCalculatorCard";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function Home() {
	const [enabled, setEnabled] = useState(false);

	return (
		<main className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 w-full h-full overflow-hidden">
			<div className="flex items-center space-x-2 mb-4">
				<Switch
					id="crypto-lot"
					checked={enabled}
					onCheckedChange={setEnabled}
					className="data-[state=checked]:bg-neutral-400 data-[state=unchecked]:bg-neutral-400"
				/>
				<Label
					htmlFor="crypto-lot"
					className="text-white text-center font-semibold"
				>
					{enabled ? "Crypto" : "Forex/CFDs"}
				</Label>
			</div>

			{enabled ? <CryptoCalculatorCard /> : <LotCalculatorCard />}
		</main>
	);
}
