import { Select } from "@chakra-ui/react";

type Option = {
	value: string | null;
	label: string;
};

type CustomSelectProps = {
	selectOptions: Option[];
	option: string | null;
	setOption: React.Dispatch<React.SetStateAction<string>>;
};

export default function CustomSelect({
	selectOptions,
	option,
	setOption,
}: CustomSelectProps) {
	const handleChange = (e: any) => {
		const selectedOption = e.target.value;
		setOption(selectedOption);
		// console.log(`${optionName} is set to`, selectedoption);
	};

	return (
		<Select
			variant="default"
			size="sm"
			value={option == null ? undefined : option}
			onChange={handleChange}
		>
			{selectOptions?.map((optionListItem) => (
				<option
					key={optionListItem.value}
					value={
						optionListItem.value === null
							? undefined
							: optionListItem.value
					}
				>
					{optionListItem.label}
				</option>
			))}
		</Select>
	);
}
