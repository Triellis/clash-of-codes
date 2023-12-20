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
  const handleChange = (e: any) => {
    const selectedOption = e.target.value;
    setTeam(selectedOption);
    // console.log(`${teamName} is set to`, selectedTeam);
  };

  return (
    <Select variant="default" size="sm" value={team} onChange={handleChange}>
      {selectOptions?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
