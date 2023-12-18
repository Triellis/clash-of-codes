"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import Pagination from "@/app/components/Pagination/Pagination";
import { fetcher, getServerUrl } from "@/app/util/functions";
import { Contest } from "@/app/util/types";
import { Divider, Flex, Heading } from "@chakra-ui/react";
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
      <Heading size={"md"}>Contests Config</Heading>

      <div className={styles.configBoard}>
        {contests.map((contest) => {
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
