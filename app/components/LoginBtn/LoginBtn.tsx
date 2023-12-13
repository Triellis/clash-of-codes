import { Button } from "@chakra-ui/react";
import Image from "next/image";
import GoogleIcon from "../../styles/Icons/BsGoogle.svg";
import { useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { useState } from "react";
export default function LoginBtn() {
	const [oneTapDisabled, setOneTapDisabled] = useState(true);
	useGoogleOneTapLogin({
		onSuccess: (credentialResponse) => {
			console.log(credentialResponse);
		},
		onError: () => {
			console.log("Login Failed");
		},
		disabled: oneTapDisabled,
	});

	const login = () => {
		setOneTapDisabled(false);
	};
	return (
		<Button
			size={{ md: "md", sm: "xs" }}
			fontFamily={"arial"}
			borderRadius={16}
			margin={"auto"}
			paddingX={4}
			paddingY={2}
			rightIcon={<Image alt="to" src={GoogleIcon} width={16} />}
			onClick={login}
		>
			Login
		</Button>
	);
}
