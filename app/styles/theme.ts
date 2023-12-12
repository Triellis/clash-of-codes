// 1. Import `extendTheme`
import { extendTheme, theme as chakraTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
//modify the yellow variant of the Button
const Button = {
	variants: {
		outline: {
			border: "2px solid",
			borderColor: "yellow.400",
			color: "yellow.400",
		},
		solid: {
			bg: "yellow.400",
			color: "gray.900",
			_hover: {
				bg: "yellow.500",
				color: "gray.900",
			},
			_active: {
				bg: "yellow.600",
				color: "gray.900",
			},
		},
	},
};
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

	components: {
		Button,
	},
});
