import Close from "@/app/styles/Icons/Close";
import Edit from "@/app/styles/Icons/Edit";
import Tick from "@/app/styles/Icons/Tick";
import Trash from "@/app/styles/Icons/Trash";
import { fullForm } from "@/app/util/functions";
import { UserOnClient } from "@/app/util/types";
import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, Input } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./UserItem.module.css";

function UserItem({
  itemData,
  mutate,
}: {
  itemData: UserOnClient;
  mutate: Function;
}) {
  let myClan = fullForm(itemData.clan!);

  const [editMode, setEditMode] = useState(false);
  const selectOptions = useMemo(
    () => [
      { value: "admin", label: "admin" },
      { value: "leader", label: "leader" },
      { value: "co-leader", label: "co-leader" },
      { value: "elder", label: "elder" },
      { value: "member", label: "member" },
      { value: "guest", label: "guest" },
    ],
    []
  );

  const selectClan = useMemo(
    () => [
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  if (editMode)
    return (
      <div className={styles.main}>
        <div className={styles.first}>
          <div>
            <Input variant={"default"} placeholder="Name" size="sm" />
          </div>
          <div>
            <Input variant={"default"} placeholder="Email" size="sm" />
          </div>
        </div>

        <div>
          <Input variant={"default"} placeholder="Username" size="sm" />
        </div>

        <div>
          <CustomSelect
            selectOptions={selectOptions}
            option={"member"}
            setOption={() => {}}
          />
        </div>

        <div>
          <CustomSelect
            selectOptions={selectClan}
            option={"BW"}
            setOption={() => {}}
          />
        </div>

        <div className={styles.last}>
          <div>
            <IconButton variant={"ghost"} aria-label="Save" icon={<Tick />} />
          </div>
          <div>
            <IconButton
              variant={"ghost"}
              aria-label="Save"
              icon={<Close />}
              onClick={() => setEditMode(false)}
            />
          </div>
        </div>
      </div>
    );

  return (
    <div className={styles.main}>
      <div className={styles.first}>
        <div>{itemData.name}</div>
        <div>{itemData.email}</div>
      </div>

      <div>{itemData.cfUsername}</div>

      <div>{itemData.role}</div>

      <div>{myClan}</div>

      <div className={styles.last}>
        <div>
          <IconButton
            variant={"ghost"}
            aria-label="Edit"
            icon={<Edit />}
            onClick={() => setEditMode(true)}
          />
        </div>
        <div>
          <IconButton variant={"ghost"} aria-label="Delete" icon={<Trash />} />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
