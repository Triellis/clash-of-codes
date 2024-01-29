"use client";

import ClanCard from "@/app/components/ClanCard/ClanCard";
import { useClanMembers, useClans } from "@/app/util/functions";
import styles from "./clan.module.css";
import { ClanData } from "@/app/util/types";
import { useState } from "react";
import ClanMemberItem from "@/app/components/ClanMemberItem/ClanMemberItem";
import Pagination from "@/app/components/Pagination/Pagination";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { event } from "nextjs-google-analytics";
import { redirect } from "next/navigation";

function ClanCardWrapper({ clanName }: { clanName: string }) {
	const { clans, isError, isLoading, mutate } = useClans(clanName);

	if (isLoading) return <div className={styles.wrapper}>Loading...</div>;
	if (isError) return redirect("/Error");

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
	setPage,
	maxResults,
	searchQuery,
}: {
	clanName: string;
	page: number;
	setPage: any;
	maxResults: number;
	searchQuery: string;
}) {
	const { members, isMembersLoading, isMembersError, membersMutate } =
		useClanMembers(clanName, searchQuery, page, maxResults);
	if (isMembersLoading)
		return <div className={styles.wrapper}>Loading...</div>;
	if (isMembersError) redirect("/Error");
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

			<Pagination
				items={members}
				maxResults={maxResults}
				page={page}
				shouldScrollToTop={true}
				setPage={setPage}
			/>
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
				<div className={styles.backNavigation}>
					<Link
						href="/Clans"
						onClick={() => {
							event("navigate", {
								menu: "Back to Clans",
							});
						}}
					>
						<ChevronLeftIcon w={8} h={8} />
						Back to Clans
					</Link>
				</div>
				<ClanCardWrapper clanName={clanName} />
				<ClanMembersWrapper
					clanName={clanName}
					page={page}
					setPage={setPage}
					maxResults={maxResults}
					searchQuery={seachQuery}
				/>
			</div>
		</div>
	);
}
