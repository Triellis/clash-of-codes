import Close from "@/app/styles/Icons/Close";
import Edit from "@/app/styles/Icons/Edit";
import Tick from "@/app/styles/Icons/Tick";
import Trash from "@/app/styles/Icons/Trash";
import { customFetch, fullForm } from "@/app/util/functions";
import { UserOnClient } from "@/app/util/types";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
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

function DeleteUserModal({
  isOpen,
  onClose,
  mutate,
  id,
  toast,
}: {
  isOpen: boolean;
  onClose: Function;
  mutate: Function;
  id: string;
  toast: any;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isCentered
      variant={"default"}
      isOpen={isOpen}
      onClose={() => onClose()}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure you want to delete this user?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="red"
            onClick={async () => {
              setIsLoading(true);
              await handleDeleteUser(String(id), mutate, toast);
              setIsLoading(false);
              onClose();
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
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
      { value: "Admin", label: "Admin" },
      { value: "Leader", label: "Leader" },
      { value: "CoLeader", label: "CoLeader" },
      { value: "Elder", label: "Elder" },
      { value: "Member", label: "Member" },
      { value: "User", label: "User" },
    ],
    []
  );

  const selectClan = useMemo(
    () => [
      { value: "none", label: "none" },
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  const toast = useToast();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

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
      <DeleteUserModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        mutate={mutate}
        id={String(itemData._id!)}
        toast={toast}
      />

      <div>
        <Text fontSize={"16x"}>{itemData.name}</Text>
        <Text fontSize={"12px"} color={"gray.500"}>
          {itemData.email}
        </Text>
      </div>

      {/* <div>{itemData.cfUsername ? itemData.cfUsername : "N/A"}</div> */}
      {itemData.cfUsername ? (
        <div>
          <Link
            href={`https://codeforces.com/profile/${itemData.cfUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {itemData.cfUsername}
          </Link>
        </div>
      ) : (
        <Text color={"gray.500"}>N/A</Text>
      )}

      <div>{itemData.role}</div>

      {/* <div>{myClan}</div> */}
      {myClan === "N/A" ? (
        <Text color={"gray.500"}>N/A</Text>
      ) : (
        <div>{myClan}</div>
      )}

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
            onClick={onOpenDeleteModal}
          />
        </div>
      </div>
    </div>
  );
}

export default UserItem;
