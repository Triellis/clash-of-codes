"use client";
import ConfigItem from "@/app/components/ConfigItem/ConfigItem";
import { Contest } from "@/app/util/types";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import styles from "./Config.module.css";

export default function Config() {
  const data: Contest[] = [
    {
      Team1: "RG",
      Team2: "BW",
      ContestCode: 12461,
      DateAdded: "24/4/2023",
      Live: true,
    },
    {
      Team1: "PP",
      Team2: "YB",
      ContestCode: 12461,
      DateAdded: "24/4/2023",
      Live: true,
    },
    {
      Team1: "RG",
      Team2: "BW",
      ContestCode: 12461,
      DateAdded: "24/4/2023",
      Live: false,
    },
    {
      Team1: "PP",
      Team2: "YB",
      ContestCode: 12461,
      DateAdded: "24/4/2023",
      Live: true,
    },
  ];
  return (
    <main className={styles.config}>
      <Heading size={"md"}>Contests Config</Heading>

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

        {data.map((contest) => {
          return (
            <ConfigItem key={contest.Score} itemData={contest as Contest} />
          );
        })}
      </div>
    </main>
  );
}
