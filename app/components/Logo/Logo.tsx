import { Heading } from "@chakra-ui/react";
import styles from "./Logo.module.css";
export default function Logo() {
	return (
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
			className={styles.logo}
		>
			Clash OF Codes
		</Heading>
	);
}
