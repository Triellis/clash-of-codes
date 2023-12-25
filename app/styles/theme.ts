// 1. Import `extendTheme`
import { theme as chakraTheme, extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
//modify the yellow variant of the Button
const Button = {
	variants: {
		outline: {
			border: "2px solid",
			borderColor: "yellow.400",
			color: "yellow.400",
			_hover: {
				bg: "yellow.500",
				color: "gray.900",
			},
		},
		solid: {
			border: "2px solid",
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
		ghost: {
			_hover: {
				bg: "gray.800",
				color: "gray.100",
			},
			_active: {
				bg: "gray.700",
				color: "gray.100",
			},
		},
	},
};

const Switch = {
	variants: {
		default: {
			thumb: {
				bg: "gray.800",
			},
			track: {
				bg: "gray.300",
				_checked: {
					bg: "yellow.400",
				},
			},
		},
	},
};

const Select = {
	variants: {
		default: {
			field: {
				bg: "gray.800",
				color: "gray.400",
				borderRadius: "6px",
				border: "1px solid",
				borderColor: "gray.700",
				fontFamily: "Sans-serif",
			},
			icon: {
				color: "gray.400",
			},
			list: {
				// Change 'List' to 'list'
				bg: "gray.800",
				color: "gray.500",
				fontFamily: "Sans-serif",
			},
		},
	},
};

const Divider = {
	variants: {
		default: {
			borderColor: "gray.500",
			borderWidth: "3px",
			borderStyle: "solid",
			marginBlock: "12px",
		},
	},
};

const Input = {
	variants: {
		default: {
			field: {
				bg: "gray.800",
				color: "gray.400",
				border: "1px solid",
				borderColor: "gray.700",
				fontFamily: "Sans-serif",
			},
		},
	},
};

const NumberInput = {
	variants: {
		default: {
			field: {
				bg: "gray.800",
				color: "gray.400",
				borderRadius: "6px",
				border: "1px solid",
				borderColor: "gray.700",
				fontFamily: "Sans-serif",
			},
			stepper: {
				color: "gray.400",
			},
		},
	},
};

const Modal = {
	variants: {
		default: {
			header: {
				bg: "gray.800",
				fontSize: "24px",
				border: "3px solid",
				borderColor: "gray.700",
				borderBottom: "none",
				borderRadius: "6px 6px 0 0",
			},
			body: {
				bg: "gray.800",
				fontSize: "14px",
				border: "3px solid",
				borderColor: "gray.700",
				borderTop: "none",
				borderBottom: "none",
			},
			overlay: {
				backdropFilter: "blur(10px)",
			},
			dialogueContainer: {
				bg: "transparent",
			},
			dialogue: {
				bg: "transparent",
			},
			footer: {
				bg: "gray.800",
				fontSize: "14px",
				border: "3px solid",
				borderColor: "gray.700",
				borderTop: "none",
				borderRadius: "0 0 6px 6px",
			},
		},
	},
};

const Tabs = {
	variants: {
		default: {
			tab: {
				width: "calc(min-content + 50px)",
				fontSize: "14px",
				borderRadius: "10px",
				paddingBlock: "12px",
				padding: "8px",
				paddingInline: "16px",
				_selected: {
					color: "black",
				},
			},

			tablist: {
				border: "1px solid",
				borderColor: "gray.700",
				borderRadius: "8px",
				height: "100%",
				padding: "8px",
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
		Switch,
		Input,
		NumberInput,
		Select,
		Divider,
		Modal,
		Tabs,
	},
});
