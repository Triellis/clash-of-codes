// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<GoogleOAuthProvider clientId="910407207351-rujuf61sg8t5jk5vco6cll51474fgm5v.apps.googleusercontent.com">
			<ChakraProvider theme={theme}>{children}</ChakraProvider>
		</GoogleOAuthProvider>
	);
}
