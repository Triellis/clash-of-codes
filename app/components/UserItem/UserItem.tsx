import Close from "@/app/styles/Icons/Close";
import Edit from "@/app/styles/Icons/Edit";
import Tick from "@/app/styles/Icons/Tick";
import Trash from "@/app/styles/Icons/Trash";
import { customFetch, fullForm } from "@/app/util/functions";
import { UserOnClient } from "@/app/util/types";
import { CheckIcon } from "@chakra-ui/icons";
import { IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import NotifToast from "../NotifToast/NotifToast";
import styles from "./UserItem.module.css";

async function handleDeleteUser(id: string, mutate: Function, toast: any) {
  const res = await customFetch(`/admin/users?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = await res.status;
  if (status === 200) {
    mutate();
    NotifToast({
      title: "User deleted successfully",
      status: "success",
      toast: toast,
    });
  }
}

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
      { value: "none", label: "None" },
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  const toast = useToast();

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
            option={"none"}
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
      <div>
        <Text fontSize={"16x"}>{itemData.name}</Text>
        <Text fontSize={"12px"} color={"gray.500"}>
          {itemData.email}
        </Text>
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
          <IconButton
            variant={"ghost"}
            aria-label="Delete"
            icon={<Trash />}
            onClick={async () =>
              await handleDeleteUser(String(itemData._id!), mutate, toast)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
