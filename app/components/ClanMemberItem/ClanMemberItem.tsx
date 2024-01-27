export default function ClanMemberItem({
	rank,
	name,
	role,
	score,
	problemsSolved,
}: {
	rank: number;
	name: string;
	role: string;
	score: number;
	problemsSolved: number;
}) {
	return (
		<div>
			<div>{rank}</div>
			<div>{name}</div>
			<div>{role}</div>
			<div>{score}</div>
			<div>{problemsSolved}</div>
		</div>
	);
}
