"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import CustomSelect from "@/app/components/CustomSelect/CustomSelect";
import NotifToast from "@/app/components/NotifToast/NotifToast";
import Pagination from "@/app/components/Pagination/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt";
import { customFetch, useConfig } from "@/app/util/functions";
import { AddContestAction, AddContestState, Clan } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Heading,
  IconButton,
  Input,
  Switch,
  useToast,
} from "@chakra-ui/react";
import React, { useMemo, useReducer, useState } from "react";
import styles from "./Config.module.css";

// for the button:
async function addContest(
  contest: AddContestState,
  mutate: Function,
  toast: any
) {
  // Remove all spaces
  if (contest?.ContestCode === "") {
    NotifToast({
      title: "Enter a valid contest code",
      status: "error",
      toast: toast,
    });
    return;
  }

  const res = await customFetch("/admin/config", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contest),
  });

  const status = await res.status;
  if (status === 200) {
    mutate();
    NotifToast({
      title: "Success",
      status: "success",
      toast: toast,
    });
  }
}

function reduceAddContest(
  state: AddContestState,
  action: AddContestAction
): AddContestState {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { Team1: "BW", Team2: "RG", ContestCode: "" };
    default:
      return state;
  }
}

export default function Config() {
  const toast = useToast();

  const selectOptions = useMemo(
    () => [
      { value: "BW", label: "Blue Wizards" },
      { value: "YB", label: "Yellow Barbarians" },
      { value: "RG", label: "Red Giants" },
      { value: "PP", label: "Purple Pekkas" },
    ],
    []
  );

  const tableCols = useMemo(
    () => ["Team1", "Team2", "ContestCode", "Date", "Live", "Remove"],
    []
  );

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const defaultContest: AddContestState = {
    Team1: "BW",
    Team2: "PP",
    ContestCode: "",
  };

  const [newContest, dispatchContest] = useReducer(
    reduceAddContest,
    defaultContest
  );

  const maxResults = 5;
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { contests, isLoading, isError, mutate } = useConfig(
    page,
    searchQuery,
    maxResults
  );
  let contestNodes;

  if (isLoading) contestNodes = <Center>Loading...</Center>;
  else if (isError) contestNodes = <Center>Error...</Center>;
  else if (contests) {
    contestNodes = contests.map((contest) => (
      <ConfigItem
        key={String(contest._id!)}
        mutate={mutate}
        itemData={contest}
      />
    ));
  }

  return (
    <main className={styles.config}>
      <Heading fontSize="32px" marginTop="64px">
        Active Contests
      </Heading>

      {/* Searchbar here */}
      <div className={styles.search}>
        <Searchbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
      </div>

      {/* form for making the item */}
      <div className={styles.configBoard}>
        <div className={styles.header}>
          {tableCols.map((col) => (
            <SpecialTxt key={col}>{col}</SpecialTxt>
          ))}
        </div>

        {/* Thickness of 2px */}
        <Divider variant="default" />

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
          <Input
            variant="default"
            placeholder="Contest Code"
            onChange={(e) => {
              dispatchContest({
                field: "ContestCode",
                value: e.target.value,
                type: "UPDATE",
              });

              // console.log("Contest code is set to", e.target.value);
            }}
            value={newContest.ContestCode}
          />

          {/* Date */}
          <div>Today</div>

          {/* IsLive */}
          <Switch variant="default" size="lg" disabled defaultChecked />

          {/* Add button */}
          <IconButton
            isLoading={isAddLoading}
            aria-label="Add"
            icon={<AddIcon />}
            width="64px"
            height="48px"
            borderRadius="16px"
            onClick={async () => {
              setIsAddLoading(true);
              await addContest(newContest, mutate, toast);
              setIsAddLoading(false);
            }}
          />
        </div>
        {contestNodes}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        items={contests}
        maxResults={maxResults}
      />
    </main>
  );
}
