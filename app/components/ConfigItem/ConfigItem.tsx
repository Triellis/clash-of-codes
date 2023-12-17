import { Contest } from "@/app/util/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Switch } from "@chakra-ui/react";
import styles from "./ConfigItem.module.css";

export default function ConfigItem({ itemData }: { itemData: Contest }) {
  console.log("item data", itemData);
  return (
    <div className={styles.main}>
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
        <Switch variant={"default"} size="lg" />
      </div>

      <div>
        <IconButton
          isRound={true}
          variant=""
					size={"lg"}
          aria-label="Done"
          fontSize="20px"
          color="red.600"
          icon={<DeleteIcon />}
        />
      </div>
    </div>
  );
}
