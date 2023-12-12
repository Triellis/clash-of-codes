import { Button } from "@chakra-ui/react";
import Image from "next/image";
import GoogleIcon from "../../styles/Icons/BsGoogle.svg";
import { useGoogleLogin } from "@react-oauth/google";
export default function LoginBtn() {
	const login = useGoogleLogin({
		onSuccess: (codeResponse) => console.log(codeResponse),
		flow: "implicit",
	});
	return (
		<Button
			size={{ md: "md", sm: "xs" }}
			fontFamily={"arial"}
			borderRadius={16}
			margin={"auto"}
			paddingX={4}
			paddingY={2}
			rightIcon={<Image alt="to" src={GoogleIcon} width={16} />}
			onClick={() => login()}
		>
			Login
		</Button>
	);
}
