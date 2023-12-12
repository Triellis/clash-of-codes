"use client";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
export default function Home() {
	return (
		<main>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
		</main>
	);
}
