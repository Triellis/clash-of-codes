import * as React from "react";
const SvgComponent = (props: any) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={16}
		height={16}
		fill="none"
		{...props}
	>
		<path
			fill="#ECC94B"
			fillRule="evenodd"
			d="M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgComponent;
