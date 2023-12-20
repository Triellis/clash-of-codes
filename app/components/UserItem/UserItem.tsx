import Edit from "@/app/styles/Icons/Edit";
import Tick from "@/app/styles/Icons/Tick";
import Trash from "@/app/styles/Icons/Trash";
import { CheckIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import styles from "./UserItem.module.css";
import Close from "@/app/styles/Icons/Close";

function UserItem() {
  let editMode = true;

  if (editMode)
    return (
      <div className={styles.main}>
        <div className={styles.first}>
          <div>Name</div>
          <div>Email</div>
        </div>

        <div>UserName</div>

        <div>Status</div>

        <div>Clan</div>

        <div className={styles.last}>
          <div>
            <IconButton variant={"ghost"} aria-label="Save" icon={<Tick />} />
          </div>
          <div>
            <IconButton variant={"ghost"} aria-label="Save" icon={<Close />} />
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div>Name</div>
        <div>Email</div>
      </div>

      <div>UserName</div>

      <div>Status</div>

      <div>Clan</div>

      <div className={styles.last}>
        <div>
          <IconButton variant={"ghost"} aria-label="Edit" icon={<Edit />} />
        </div>
        <div>
          <IconButton variant={"ghost"} aria-label="Delete" icon={<Trash />} />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
