import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Logo.module.css";
import { event } from "nextjs-google-analytics";
export default function Logo() {
	return (
		<Link
			href={"/Live"}
			onClick={() => {
				event("navigate", {
					menu: "Live ( from logo )",
				});
			}}
		>
			<Heading
				fontSize={{
					sm: 16,
					md: 24,
				}}
				textAlign={"center"}
				height="100%"
				justifyContent={"center"}
				alignItems={"center"}
				display={"flex"}
				className="logo"
			>
				Clash OF Codes
			</Heading>
		</Link>
	);
}
