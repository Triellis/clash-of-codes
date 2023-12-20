import { AddIcon } from "@chakra-ui/icons";
import { IconButton, Input } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./UserAdd.module.css";
function UserAdd() {
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

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.main}>
      <div>
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

      <div>
        <div>
          <IconButton
            isLoading={isLoading}
            aria-label="Add"
            icon={<AddIcon />}
            width="64px"
            height="48px"
            borderRadius="16px"
            // onClick={async () => {
            //   setIsLoading(true);
            //   setPage(1);
            //   await addContest(newContest, mutate, toast);
            //   mutate();
            //   dispatchContest({ type: "RESET" });
            //   setIsLoading(false);
            // }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserAdd;
