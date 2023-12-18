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
import useSWR from "swr";
import styles from "./Config.module.css";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  selectOptions: Option[];
  teamName: string;
};

function CustomSelect({ selectOptions, teamName }: CustomSelectProps) {
  return (
    <Select variant="default" placeholder={`Select ${teamName}`} size="sm">
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

export default function Config() {
  const { contests, isLoading, isError, mutate } = useConfig(1);

  let contestNodes;

  if (isLoading) contestNodes = <Center>Loading...</Center>;
  if (isError) contestNodes = <Center>Error...</Center>;

  if (contests) {
    contestNodes = contests?.map((contest) => {
      return (
        <ConfigItem
          key={String(contest._id!)}
          itemData={contest as ContestCol}
        />
      );
    });
  }

  const selectOptions = [
    { value: "BW", label: "Blue Wizards" },
    { value: "YB", label: "Yellow Barbarians" },
    { value: "RG", label: "Red Giants" },
    { value: "PP", label: "Purple Pekkas" },
  ];

  return (
    <main className={styles.config}>
      <Heading fontSize={"32px"} marginTop={"64px"}>
        Active Contests
      </Heading>

      {/* Searchbar here */}
      <div className={styles.search}>
        <Searchbar />
      </div>

      {/* form for makign the item: */}

      <div className={styles.configBoard}>
        <div className={styles.header}>
          <SpecialTxt>Team1</SpecialTxt>
          <SpecialTxt>Team2</SpecialTxt>
          <SpecialTxt>Contest Code</SpecialTxt>
          <SpecialTxt>Date </SpecialTxt>
          <SpecialTxt>Live </SpecialTxt>
          <SpecialTxt>Remove</SpecialTxt>
        </div>

        {/* thickness of 2px */}
        <Divider variant={"default  "} />

        <div className={styles.configForm}>
          {/* team1 */}
          <CustomSelect selectOptions={selectOptions} teamName="Team 1" />

          {/* team2 */}
          <CustomSelect selectOptions={selectOptions} teamName="Team 2" />

          {/* contest code */}
          <Input variant="default" placeholder="Contest Code" />

          {/* date */}
          <div>Today</div>

          {/* isLive */}
          <Switch variant={"default"} size="lg" disabled defaultChecked />

          {/* add button */}
          <IconButton
            aria-label="Add"
            icon={<AddIcon />}
            width={"64px"}
            height={"48px"}
            borderRadius={"16px"}
          />
        </div>
        {contestNodes}
      </div>

      <Pagination />
    </main>
  );
}
