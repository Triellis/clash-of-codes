"use client";

import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt";
import { fetcher, getServerUrl } from "@/app/util/functions";
import { ContestCol } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Center,
  Divider,
  Heading,
  IconButton,
  Input,
  Select,
  Switch,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import styles from "./Config.module.css";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  selectOptions: Option[];
  teamName: string;
  team: string;
  setTeam: React.Dispatch<React.SetStateAction<string>>;
};

function CustomSelect({
  selectOptions,
  teamName,
  team,
  setTeam,
}: CustomSelectProps) {
  const handleTeamChange = (e: any) => {
    const selectedTeam = e.target.value;
    setTeam(selectedTeam);
    // console.log(`${teamName} is set to`, selectedTeam);
  };

  return (
    <Select
      variant="default"
      placeholder={`Select ${teamName}`}
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

function useConfig(page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    getServerUrl(`admin/config?page=${page}&maxResults=5`),
    fetcher
  );

  return {
    contests: data as ContestCol[],
    isLoading,
    isError: error,
    mutate,
  };
}

async function addContest({
  team1,
  team2,
  contestCode,
  date,
  live,
}: {
  team1: string;
  team2: string;
  contestCode: string;
  date: string;
  live: boolean;
}) {
  const res = await fetch(getServerUrl("admin/config"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      team1,
      team2,
      contestCode,
      date,
      live,
    }),
  });

  const data = await res.json();
  console.log(data);
}

const Config: React.FC = () => {
  const { contests, isLoading, isError } = useConfig(1);

  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [contestCode, setContestCode] = useState<string>("");

  let contestNodes;

  if (isLoading) contestNodes = <Center>Loading...</Center>;
  else if (isError) contestNodes = <Center>Error...</Center>;
  else if (contests) {
    contestNodes = contests.map((contest) => (
      <ConfigItem key={String(contest._id!)} itemData={contest} />
    ));
  }

  const selectOptions = [
    { value: "BW", label: "Blue Wizards" },
    { value: "YB", label: "Yellow Barbarians" },
    { value: "RG", label: "Red Giants" },
    { value: "PP", label: "Purple Pekkas" },
  ];

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);

  return (
    <main className={styles.config}>
      <Heading fontSize="32px" marginTop="64px">
        Active Contests
      </Heading>

      {/* Searchbar here */}
      <div className={styles.search}>
        <Searchbar />
      </div>

      {/* form for making the item */}
      <div className={styles.configBoard}>
        <div className={styles.header}>
          <SpecialTxt>Team1</SpecialTxt>
          <SpecialTxt>Team2</SpecialTxt>
          <SpecialTxt>Contest Code</SpecialTxt>
          <SpecialTxt>Date</SpecialTxt>
          <SpecialTxt>Live</SpecialTxt>
          <SpecialTxt>Remove</SpecialTxt>
        </div>

        {/* Thickness of 2px */}
        <Divider variant="default" />

        <div className={styles.configForm}>
          {/* Team1 */}
          <CustomSelect
            selectOptions={selectOptions}
            teamName="Team 1"
            team={team1}
            setTeam={setTeam1}
          />

          {/* Team2 */}
          <CustomSelect
            selectOptions={selectOptions}
            teamName="Team 2"
            team={team2}
            setTeam={setTeam2}
          />

          {/* Contest code */}
          <Input
            variant="default"
            placeholder="Contest Code"
            onChange={(e) => {
              setContestCode(e.target.value);
              // console.log("Contest code is set to", e.target.value);
            }}
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
            onClick={() => {
              setIsAddLoading(true);
              addContest({
                team1,
                team2,
                contestCode,
                date: new Date().toISOString().slice(0, 10),
                live: true,
              });
              setIsAddLoading(false);
            }}
          />
        </div>
        {contestNodes}
      </div>

      <Pagination />
    </main>
  );
};

export default Config;
