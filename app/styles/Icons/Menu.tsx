import * as React from "react";
const SvgComponent = (props: any) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={20}
		fill="none"
		{...props}
	>
		<path
			fill="#ECC94B"
			fillRule="evenodd"
			d="M.8 2A1.6 1.6 0 0 1 2.4.4h19.2a1.6 1.6 0 1 1 0 3.2H2.4A1.6 1.6 0 0 1 .8 2Zm0 8a1.6 1.6 0 0 1 1.6-1.6h19.2a1.6 1.6 0 1 1 0 3.2H2.4A1.6 1.6 0 0 1 .8 10Zm0 8a1.6 1.6 0 0 1 1.6-1.6h19.2a1.6 1.6 0 0 1 0 3.2H2.4A1.6 1.6 0 0 1 .8 18Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default SvgComponent;
