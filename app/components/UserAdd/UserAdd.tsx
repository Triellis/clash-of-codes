import { addUser } from "@/app/util/functions";
import { AddUserAction, UserOnClient } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Input } from "@chakra-ui/react";
import { useMemo, useReducer } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./UserAdd.module.css";

type UserAddProps = {
  toast: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: Function;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  reduceAddUser: (state: UserOnClient, action: AddUserAction) => UserOnClient;
};

function UserAdd({
  toast,
  isLoading,
  setIsLoading,
  mutate,
  setPage,
  reduceAddUser,
}: UserAddProps) {
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
      { value: null, label: "None" },
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  const defaultUser: UserOnClient = {
    name: "",
    email: "",
    cfUsername: "",
    role: "Member",
    clan: null,
  };

  const [newUser, dispatchUser] = useReducer(reduceAddUser, defaultUser);

  return (
    <div className={styles.main}>
      <div>
        <div>
          <Input
            variant={"default"}
            placeholder="Name"
            size="sm"
            value={String(newUser.name)}
            onChange={(e) =>
              dispatchUser({
                type: "UPDATE",
                field: "name",
                value: e.target.value,
              })
            }
          />
        </div>
        <div>
          <Input
            variant={"default"}
            placeholder="Email"
            size="sm"
            value={String(newUser.email)}
            onChange={(e) =>
              dispatchUser({
                type: "UPDATE",
                field: "email",
                value: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div>
        <Input
          variant={"default"}
          placeholder="Username"
          size="sm"
          value={newUser.cfUsername}
          onChange={(e) => {
            const input = e.target.value;

            dispatchUser({
              field: "cfUsername",
              value: input,
              type: "UPDATE",
            });
          }}
        />
      </div>

      <div>
        <CustomSelect
          selectOptions={selectOptions}
          option={newUser.role}
          setOption={(val) => {
            dispatchUser({
              type: "UPDATE",
              field: "role",
              value: val as string,
            });
          }}
        />
      </div>

      <div>
        <CustomSelect
          selectOptions={selectClan}
          option={newUser.clan!}
          setOption={(val) => {
            dispatchUser({
              type: "UPDATE",
              field: "clan",
              value: val as string,
            });
          }}
        />
      </div>

      <div>
        <div>
          <IconButton
            isLoading={isLoading}
            aria-label="Add"
            icon={<AddIcon />}
            width="64px"
            height="48px"
            borderRadius="16px"
            onClick={async () => {
              setIsLoading(true);
              setPage(1);
              await addUser(newUser, mutate, toast, dispatchUser);
              mutate();
              setIsLoading(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
