import { addContest } from "@/app/util/functions";
import { AddContestState, Clan } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  IconButton,
  NumberInput,
  NumberInputField,
  Switch,
} from "@chakra-ui/react";
import React, { useMemo } from "react";

import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./ConfigBoard.module.css";

type ConfigureBoardProps = {
  toast: any;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  newContest: AddContestState;
  dispatchContest: Function;
  mutate: Function;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function ConfigBoard({
  toast,
  isLoading,
  setIsLoading,
  newContest,
  dispatchContest,
  mutate,
  setPage,
}: ConfigureBoardProps) {
  const selectOptions = useMemo(
    () => [
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  return (
    <div>
      <div className={styles.configForm}>
        {/* Team1 */}
        <CustomSelect
          selectOptions={selectOptions}
          option={newContest.Team1}
          setOption={(val) =>
            dispatchContest({
              type: "UPDATE",
              field: "Team1",
              value: val as Clan,
            })
          }
        />

        {/* Team2 */}
        <CustomSelect
          selectOptions={selectOptions}
          option={newContest.Team2}
          setOption={(val) =>
            dispatchContest({
              type: "UPDATE",
              field: "Team2",
              value: val as Clan,
            })
          }
        />

        {/* Contest code */}
        <NumberInput variant="default">
          <NumberInputField
            placeholder="Contest Code"
            onChange={(e: any) => {
              dispatchContest({
                field: "ContestCode",
                value: e.target.value,
                type: "UPDATE",
              });

              // console.log("Contest code is set to", e.target.value);
            }}
            value={newContest.ContestCode}
          />
        </NumberInput>

        {/* Date */}
        <div>Today</div>

        {/* IsLive */}
        <Switch variant="default" size="lg" disabled defaultChecked />

        {/* Add button */}
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
            await addContest(newContest, mutate, toast);
            mutate();
            dispatchContest({ type: "RESET" });
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
}

export default ConfigBoard;
