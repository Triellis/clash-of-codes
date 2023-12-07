// 1. Import `extendTheme`
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
	styles: {
		global: () => ({
			body: {
				bg: "gray.900",
				color: "gray.100",
			},
		}),
	},
	fonts: {
		heading: `supercell,sans-serif`,
		body: `supercell,sans-serif`,
	},
});
