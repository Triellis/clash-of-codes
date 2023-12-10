import { Heading } from "@chakra-ui/react";
import styles from "./Logo.module.css";
export default function Logo() {
	return (
		<Heading
			fontSize={{
				sm: 18,
				md: 24,
			}}
			textAlign={"center"}
			height={"min-content"}
			className={styles.logo}
		>
			Clash OF Codes
		</Heading>
	);
}
