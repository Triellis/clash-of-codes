"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import { fetcher, getServerUrl } from "@/app/util/functions";
import { Contest } from "@/app/util/types";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
} from "@chakra-ui/react";
import useSWR from "swr";
import styles from "./Config.module.css";
function useConfig(page: number) {
  const { data, error, isLoading, mutate } = useSWR(
    getServerUrl(`admin/config?page=${page}`),
    fetcher
  );

  return {
    contests: data as Contest[],
    isLoading,
    isError: error,
    mutate,
  };
}
export default function Config() {
  const { contests, isLoading, isError, mutate } = useConfig(1);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <main className={styles.config}>
      <Heading size={"md"} marginBlock={"2em"}>Active Contests</Heading>

      {/* form for makign the item: */}

      <div className={styles.configForm}>
        <Input variant="default" placeholder="Team 1 Name" />
        <Input variant="default" placeholder="Team 2 Name" />
        <Input variant="default" placeholder="Contest Code" />
        <IconButton
          aria-label="Add Contest"
          icon={<AddIcon />}
          width={"25%"}
          isRound
        />
      </div>

      <div className={styles.configBoard}>
        <div className={styles.header}>
          <div>Team1</div>
          <div>Team2</div>
          <div>Contest Code</div>
          <div>Date </div>
          <div>Live </div>
          <div>Remove</div>
        </div>

        <Divider />

        {contests?.map((contest) => {
          return (
            <ConfigItem
              key={contest.Score + 55}
              itemData={contest as Contest}
            />
          );
        })}
      </div>

      <Pagination />
    </main>
  );
}
