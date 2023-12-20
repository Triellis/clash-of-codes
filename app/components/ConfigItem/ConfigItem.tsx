import Trash from "@/app/styles/Icons/Trash";
import { customFetch, fullForm } from "@/app/util/functions";
import { ContestCol } from "@/app/util/types";
import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Switch, useToast } from "@chakra-ui/react";
import NotifToast from "../NotifToast";
import styles from "./ConfigItem.module.css";

async function deleteContest(contestId: string, mutate: Function, toast: any) {
  const res = await customFetch(`/admin/config?id=${contestId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = await res.status;
  if (status === 200) {
    mutate();
    NotifToast({
      title: "Deleted",
      status: "success",
      toast: toast,
    });
  }
}
async function updateContest(
  contest: ContestCol,
  mutate: Function,
  toast: any
) {
  const res = await customFetch(`/admin/config`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contest),
  });

  const status = await res.status;
  if (status === 200) {
    mutate();
    NotifToast({
      title: "Updated",
      status: "success",
      toast: toast,
    });
  } else {
    NotifToast({
      title: "Error",
      status: "error",
      toast: toast,
    });
  }
}
export default function ConfigItem({
  itemData,
  mutate,
}: {
  itemData: ContestCol;
  mutate: Function;
}) {
  const team1 = fullForm(itemData.Team1);
  const team2 = fullForm(itemData.Team2);
  const toast = useToast();
  return (
    <div className={styles.main}>
      <div>{team1}</div>

      <div>{team2}</div>

      <div>{itemData.ContestCode}</div>

      <div>{new Date(itemData.DateAdded.toString()).toLocaleDateString()}</div>

      <div>
        <Switch
          variant={"default"}
          size="lg"
          defaultChecked={itemData.Live}
          onChange={async () =>
            await updateContest(
              {
                ...itemData,
                Live: !itemData.Live,
              },
              mutate,
              toast
            )
          }
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
          onClick={async () =>
            await deleteContest(String(itemData._id!), mutate, toast)
          }
        />
      </div>
    </div>
  );
}
