import Trash from "@/app/styles/Icons/Trash";
import { ContestCol } from "@/app/util/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Switch } from "@chakra-ui/react";
import styles from "./ConfigItem.module.css";

function fullForm(short: string) {
	switch (short) {
		case "RG":
			return "Red Giants";
		case "BW":
			return "Blue Wizards";
		case "PP":
			return "Purple PEKKAS";
		case "YB":
			return "Yellow Barbarians";
		default:
			return "Seedhi ritna team aapne";
	}
}

export default function ConfigItem({ itemData }: { itemData: ContestCol }) {
	const team1 = fullForm(itemData.Team1);
	const team2 = fullForm(itemData.Team2);

	return (
		<div className={styles.main}>
			<div>{team1}</div>

			<div>{team2}</div>

			<div>{itemData.ContestCode}</div>

			<div>
				{new Date(itemData.DateAdded.toString()).toLocaleDateString()}
			</div>

			<div>
				<Switch
					variant={"default"}
					size="lg"
					defaultChecked={itemData.Live}
				/>
			</div>

			<div>
				<IconButton
					isRound={true}
					variant=""
					size={"lg"}
					aria-label="Done"
					fontSize="20px"
					color="red.600"
					icon={<Trash />}
				/>
			</div>
		</div>
	);
}
