import { Heading } from "@chakra-ui/react";
import styles from "./Logo.module.css";
export default function Logo() {
	return (
		<Heading
			fontSize={{
				sm: "20px",
				md: "32px",
			}}
			className={styles.logo}
		>
			Clash OF Codes
		</Heading>
	);
}
