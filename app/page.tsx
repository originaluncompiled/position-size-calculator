import CalculatorCard from "@/components/CalculatorCard";

export default function Home() {
	return (
		<main className="flex flex-row h-screen w-screen items-center justify-center bg-slate-950">
			<CalculatorCard assetName="US500" assetColor="bg-red-500"/>
		</main>
	);
}
