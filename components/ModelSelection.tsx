"use client";
import useSWR from "swr";
import Select from "react-select";

async function fetchModels() {
	const res = await fetch("/api/getEngines");
	console.log("FETCH MODEL", res);
	return await res.json();
}

function ModelSelection() {
	const { data: models, isLoading } = useSWR("models", fetchModels);
	const { data: model, mutate: setModel } = useSWR("model", {
		fallbackData: "text-davinci-003",
	});

	return (
		<div className="mt-2">
			<Select
				className="h-10"
				defaultValue={model}
				value={model}
				isSearchable
				isLoading={isLoading}
				menuPosition="fixed"
				classNames={{
					control: (state) => " rounded-xl py-1 bg-[#434654]",
				}}
				placeholder={model}
				onChange={(e) => {
					setModel(e.value);
					console.log("EVALUE", e.value);
				}}
				options={models?.modelOptions}
			/>
		</div>
	);
}

export default ModelSelection;
