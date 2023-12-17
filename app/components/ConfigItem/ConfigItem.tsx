import { Contest } from "@/app/util/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Switch } from "@chakra-ui/react";
import styles from "./ConfigItem.module.css";
import Trash from "@/app/styles/Icons/Trash";

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

export default function ConfigItem({ itemData }: { itemData: Contest }) {
	console.log("item data", itemData);
	return (
		<div className={styles.main}>
			{/* Order:
  console.log("item data", itemData);

  const Team1 = fullForm(itemData.Team1);
  const Team2 = fullForm(itemData.Team2);

  return (
    <div className={styles.main}>
      <div>{Team1}</div>
      {/* Order:
				-Team1
				-Team2
				-Contest Code
				-Date Added
				-isLive Toggle
				-Remove Button
			*/}

			<div>{itemData.Team1}</div>

			<div>{itemData.Team2}</div>

			<div>{itemData.ContestCode}</div>

			<div>{itemData.DateAdded}</div>

      <div>
        <Switch variant={"default"} size="lg" defaultChecked={itemData.Live} />
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
