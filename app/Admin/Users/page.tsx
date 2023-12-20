"use client";
import ConfigItem from "@/app/components/ConfigItem";
import Pagination from "@/app/components/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt/SpecialTxt";
import UserAdd from "@/app/components/UserAdd/UserAdd";
import UserItem from "@/app/components/UserItem/UserItem";
import { useUser } from "@/app/util/functions";
import { Center, Divider, Heading } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import styles from "./Users.module.css";

export default function Users() {
  const maxResults = 5;
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const tableCols = useMemo(
    () => ["Name", "CF Handle", "Status", "Clan", "Action"],
    []
  );

  const { users, isLoading, isError, mutate } = useUser(
    page,
    searchQuery,
    maxResults
  );

  console.log("users", users);

  let userNodes;
  if (isLoading) userNodes = <Center>Loading...</Center>;
  else if (isError) userNodes = <Center>Error...</Center>;
  else if (users) {
    userNodes = users.map((usr) => (
      <UserItem key={String(usr._id!)} mutate={mutate} itemData={usr} />
    ));
  }

  return (
    <div className={styles.main}>
      <Heading fontSize="32px" marginTop="64px">
        Users
      </Heading>

      <Searchbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />

      {/* headers */}
      <div className={styles.usersBoard}>
        <div className={styles.header}>
          {tableCols.map((col) => (
            <SpecialTxt key={col}>{col}</SpecialTxt>
          ))}
        </div>

        <Divider variant="default" />

        <div className={styles.list}>
          <UserAdd />

          {userNodes}
        </div>
      </div>

      <Pagination
        page={page}
        setPage={setPage}
        items={users}
        maxResults={maxResults}
      />
    </div>
  );
}
