import Trash from "@/app/styles/Icons/Trash";
import { customFetch, fullForm } from "@/app/util/functions";
import { ContestCol } from "@/app/util/types";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
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

function DeleteModal({
  isOpen,
  onOpen,
  onClose,
  contestId,
  toast,
  mutate,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  contestId: string;
  toast: any;
  mutate: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal isCentered variant={"default"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Contest</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this contest?</ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await deleteContest(contestId, mutate, toast);
              setIsLoading(false);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
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

  // modal states:
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <div className={styles.main}>
      <DeleteModal
        isOpen={isDeleteOpen}
        onOpen={onDeleteOpen}
        onClose={onDeleteClose}
        contestId={String(itemData?.ContestCode)}
        toast={toast}
        mutate={mutate}
      />

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
          onClick={onDeleteOpen}
        />
      </div>
    </div>
  );
}
