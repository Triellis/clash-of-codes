import { Contest } from "@/app/util/types";
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

      <div>Team1</div>

      <div>Team2</div>

      <div>Contest Code</div>

      <div>Date Added</div>

      <div>isLive Toggle</div>

      <div>Remove Button</div>
    </div>
  );
}
