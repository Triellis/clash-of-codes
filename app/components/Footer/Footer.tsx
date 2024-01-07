"use client";

import Triellis from "@/app/styles/Icons/Triellis";
import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import Github from "../../styles/Icons/Github";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<Box
			// bg={useColorModeValue("gray.50", "gray.900")}
			bg="gray.800"
			// color={useColorModeValue("gray.700", "gray.200")}
			fontFamily={"sans-serif"}
			className={styles.main}
		>
			<Flex justifyContent={"space-between"} alignItems={"center"}>
				<Flex direction={"row"} gap={2}>
					<a href="https://github.com/Triellis" target="_blank">
						<Flex
							gap={2}
							direction={"column"}
							justifyContent={"space-between"}
							alignItems={"center"}
							fontSize={12}
						>
							<Triellis />
							<span className={styles.companyName}>TRIELLIS</span>
						</Flex>
					</a>
					<Flex
						justifyContent={"space-between"}
						alignItems={"center"}
						gap={0}
						fontSize={12}
						opacity={0.8}
						direction={"column"}
					>
						<a
							href="https://github.com/Triellis/clash-of-codes"
							target="_blank"
						>
							<Github className={styles.GHIcon} />
						</a>
						<span style={{ fontFamily: "sans-serif" }}>©2024 </span>
					</Flex>
				</Flex>
				<Flex direction={"column"} gap={1}>
					<span className={styles.creator}>
						Created by{" "}
						<a
							className={styles.links}
							href="https://www.linkedin.com/in/zeel-rajodiya"
							target="_blank"
						>
							Zeel Rajodiya
						</a>{" "}
						|{"  "}
						<a
							className={styles.links}
							href="https://www.linkedin.com/in/sarthak-siddhpura-544389257"
							target="_blank"
						>
							Sarthak Siddhpura
						</a>
					</span>
					<span className={styles.specialThanks}>
						Special thanks to{" "}
						<a
							href="https://www.linkedin.com/in/malaypatelau"
							target="_blank"
							className={styles.links}
						>
							Malay Patel
						</a>
					</span>
				</Flex>
			</Flex>
		</Box>
	);
}
