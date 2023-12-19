import { Select } from "@chakra-ui/react";

type Option = {
	value: string;
	label: string;
};

type CustomSelectProps = {
	selectOptions: Option[];
	option: string;
	setOption: React.Dispatch<React.SetStateAction<string>>;
};

export default function CustomSelect({
	selectOptions,
	option: team,
	setOption: setTeam,
}: CustomSelectProps) {
	const handleTeamChange = (e: any) => {
		const selectedTeam = e.target.value;
		setTeam(selectedTeam);
		// console.log(`${teamName} is set to`, selectedTeam);
	};

	return (
		<Select
			variant="default"
			size="sm"
			value={team}
			onChange={handleTeamChange}
		>
			{selectOptions?.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</Select>
	);
}
