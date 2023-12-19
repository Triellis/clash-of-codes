import * as React from "react";
const SvgComponent = (props: any) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={24}
		height={26}
		fill="none"
		{...props}
	>
		<path
			fill="#C53030"
			d="M7.25 2.75H7a.25.25 0 0 0 .25-.25v.25h9.5V2.5c0 .138.113.25.25.25h-.25V5H19V2.5c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2V5h2.25V2.75ZM23 5H1c-.553 0-1 .447-1 1v1c0 .138.113.25.25.25h1.888l.771 16.344A2.002 2.002 0 0 0 4.906 25.5h14.188a1.997 1.997 0 0 0 1.997-1.906l.771-16.344h1.888A.25.25 0 0 0 24 7V6c0-.553-.447-1-1-1Zm-4.147 18.25H5.147l-.756-16h15.218l-.756 16Z"
		/>
	</svg>
);
export default SvgComponent;
