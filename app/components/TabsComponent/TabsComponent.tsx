import { TabsType } from "@/app/util/types";
import { Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import styles from "./TabsComponent.module.css";

interface TabsComponentProps {
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tab: string;
  allTabs: TabsType;
}

function getColor(tabs: TabsType, value: string) {
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].value === value) {
      return tabs[i].color;
    }
  }
}

export default function TabsComponent({
  setTab,
  tab,
  allTabs,
}: TabsComponentProps) {
  return (
    <Tabs
      className={styles.tabGrp}
      variant={"default"}
      defaultIndex={0}
      onChange={(index) => {
        setTab(allTabs[index].value); // Set the tab state to the selected tab value
      }}
    >
      <TabList className={styles.tabList}>
        {allTabs.map((tab, index) => (
          <Tab key={tab.value}>{tab.label}</Tab>
        ))}
        <TabIndicator className={styles.indicator} />
      </TabList>
    </Tabs>
  );
}
