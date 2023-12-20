"use client";
import Pagination from "@/app/components/Pagination";
import Searchbar from "@/app/components/Searchbar/Searchbar";
import SpecialTxt from "@/app/components/SpecialTxt/SpecialTxt";
import UserAdd from "@/app/components/UserAdd/UserAdd";
import UserItem from "@/app/components/UserItem/UserItem";
import { Divider, Heading } from "@chakra-ui/react";
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

  let users;
  // if (isLoading) contestNodes = <Center>Loading...</Center>;
  // else if (isError) contestNodes = <Center>Error...</Center>;
  // else if (contests) {
  //   contestNodes = contests.map((contest) => (
  //     <ConfigItem
  //       key={String(contest._id!)}
  //       mutate={mutate}
  //       itemData={contest}
  //     />
  //   ));
  // }
  users = <UserItem />;

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

          {users}
        </div>
      </div>

      {/* <Pagination
        page={page}
        setPage={setPage}
        // items={contests}
        maxResults={maxResults}
      /> */}
    </div>
  );
}
