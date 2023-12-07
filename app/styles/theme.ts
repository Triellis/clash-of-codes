// 1. Import `extendTheme`
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
//modify the yellow variant of the Button
const Button = {};
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
	colors: {
		brand: {
			100: "yellow.100",
			200: "yellow.200",
			300: "yellow.300",
			400: "yellow.400",
			500: "yellow.500",
			600: "yellow.600",
			700: "yellow.700",
			800: "yellow.800",
			900: "yellow.900",
		},
	},
	components: {
		Button,
	},
});
