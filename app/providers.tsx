// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<GoogleOAuthProvider clientId="910407207351-bbco7kig0hrnf8qmqqpf043npqiqbgvh.apps.googleusercontent.com">
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</GoogleOAuthProvider>
	);
}
