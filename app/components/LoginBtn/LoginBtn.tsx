import { Button } from "@chakra-ui/react";
import Image from "next/image";
import GoogleIcon from "../../styles/Icons/BsGoogle.svg";

export default function LoginBtn() {
	return (
		<Button
			size={"sm"}
			rightIcon={<Image alt="to" src={GoogleIcon} width={16} />}
		>
			Login
		</Button>
	);
}
