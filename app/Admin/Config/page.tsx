"use client";
import ConfigBoard from "@/app/components/ConfigBoard/ConfigBoard";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt";
import { useConfig } from "@/app/util/functions";
import { AddContestAction, AddContestState, Clan } from "@/app/util/types";
import { Box, Center, Divider, Heading, useToast } from "@chakra-ui/react";
import React, { useMemo, useReducer, useState } from "react";
import styles from "./Config.module.css";

// for the button:
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

  const tableCols = useMemo(
    () => ["Team1", "Team2", "Contest Code", "Date Added", "Live", "Remove"],
    []
  );

  const defaultContest: AddContestState = {
    Team1: "BW",
    Team2: "PP",
    ContestCode: "",
  };

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

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

    if (contestNodes.length === 0) {
      contestNodes = <Center>No contests found</Center>;
    }
  }

  return (
    <main className={styles.config}>
      <Heading fontSize="32px" marginBlock={"32px"}>
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

        <Divider variant="default" />

        <ConfigBoard
          toast={toast}
          isLoading={isAddLoading}
          setIsLoading={setIsAddLoading}
          newContest={newContest}
          dispatchContest={dispatchContest}
          mutate={mutate}
          setPage={setPage}
        />

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
