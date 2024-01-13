import { Heading } from "@chakra-ui/react";
import Link from "next/link";
import styles from "./Logo.module.css";
export default function Logo() {
	return (
		<Link href={"/Live"}>
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
