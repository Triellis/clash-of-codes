"use client";

import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import NotifToast from "@/app/components/NotifToast/NotifToast";
import Pagination from "@/app/components/Pagination/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt";
import { customFetch, fetcher, getServerUrl } from "@/app/util/functions";
import { Clan, ContestCol } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Heading,
  IconButton,
  Input,
  Select,
  Switch,
  useToast,
} from "@chakra-ui/react";
import {
  ReducerActions,
  ReducerState,
} from "next/dist/client/components/router-reducer/router-reducer-types";
import { describe } from "node:test";
import React, { useMemo, useReducer, useState } from "react";
import useSWR, { mutate } from "swr";
import styles from "./Config.module.css";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  selectOptions: Option[];
  team: string;
  setTeam: React.Dispatch<React.SetStateAction<string>>;
};

function CustomSelect({ selectOptions, team, setTeam }: CustomSelectProps) {
  const handleTeamChange = (e: any) => {
    const selectedTeam = e.target.value;
    setTeam(selectedTeam);
    // console.log(`${teamName} is set to`, selectedTeam);
  };

  return (
    <Select
      variant="default"
      size="sm"
      value={team}
      onChange={handleTeamChange}
    >
      {selectOptions?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

function useConfig(page: number, maxResults: number) {
  const { data, error, isLoading, mutate } = useSWR(
    getServerUrl(`/admin/config?page=${page}&maxResults=${maxResults}`),
    fetcher
  );

  return {
    contests: data as ContestCol[],
    isLoading,
    isError: error,
    mutate,
  };
}

type AddContestState = { Team1: Clan; Team2: Clan; ContestCode: string };

// for the button:
async function addContest(
  contest: AddContestState,
  mutate: Function,
  toast: any
) {
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
  console.log(status);
}

interface AddContestAction {
  field: "Team1" | "Team2" | "ContestCode";
  value: Clan | string;
  type: "UPDATE" | "RESET";
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
  const { contests, isLoading, isError, mutate } = useConfig(1, maxResults);
  let contestNodes;

  if (isLoading) contestNodes = <Center>Loading...</Center>;
  else if (isError) contestNodes = <Center>Error...</Center>;
  else if (contests) {
    contestNodes = contests.map((contest) => (
      <ConfigItem key={String(contest._id!)} itemData={contest} />
    ));
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

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
            team={newContest.Team1}
            setTeam={(val) =>
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
            team={newContest.Team2}
            setTeam={(val) =>
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
