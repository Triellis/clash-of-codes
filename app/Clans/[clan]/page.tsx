"use client";

import ClanCard from "@/app/components/ClanCard/ClanCard";
import { useClanMembers, useClans } from "@/app/util/functions";
import styles from "./clan.module.css";
import { ClanData } from "@/app/util/types";
import { useState } from "react";
import ClanMemberItem from "@/app/components/ClanMemberItem/ClanMemberItem";

function ClanCardWrapper({ clanName }: { clanName: string }) {
	const { clans, isError, isLoading, mutate } = useClans(clanName);

	if (isLoading) return <div className={styles.wrapper}>Loading...</div>;
	if (isError) return <div className={styles.wrapper}>Error</div>;

	return (
		<div>
			<ClanCard
				clanName={(clans as ClanData).clanName}
				clanScore={(clans as ClanData).totalScore}
				solvedProblems={(clans as ClanData).totalProblemSolved}
				rank={(clans as ClanData).rank}
				isLink={false}
			/>
		</div>
	);
}
function ClanMembersWrapper({
	clanName,
	page,
	maxResults,
	searchQuery,
}: {
	clanName: string;
	page: number;
	maxResults: number;
	searchQuery: string;
}) {
	const { members, isMembersLoading, isMembersError, membersMutate } =
		useClanMembers(clanName, searchQuery, page, maxResults);
	if (isMembersLoading) return <div>Loading...</div>;
	if (isMembersError) return <div>Error</div>;
	return (
		<div className={styles.clanMembersWrapper}>
			{members.map((member) => {
				return (
					<ClanMemberItem
						cfUsername={member.cfUsername}
						key={member.cfUsername}
						name={member.name}
						rank={member.rank}
						role={member.role}
						score={member.score}
						problemsSolved={member.problemSolved}
					/>
				);
			})}
		</div>
	);
}
export default function ClanPage({
	params,
}: {
	params: {
		clan: string;
	};
}) {
	const clanName = params.clan;
	const [page, setPage] = useState(1);
	const maxResults = 25;
	const [seachQuery, setSearchQuery] = useState("");

	useClanMembers(clanName, "", 1, 10);
	return (
		<div className={styles.wrapper}>
			<div className={styles.main}>
				<ClanCardWrapper clanName={clanName} />
				<ClanMembersWrapper
					clanName={clanName}
					page={page}
					maxResults={maxResults}
					searchQuery={seachQuery}
				/>
			</div>
		</div>
	);
}
