import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width={35}
		height={34}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<g filter="url(#a)">
			<path
				d="M23.667 20.375c0 5.707-4.627 10.334-10.334 10.334S3 26.082 3 20.375s4.626-10.333 10.333-10.333 10.334 4.626 10.334 10.333Zm-18.575 0a8.241 8.241 0 1 0 16.483 0 8.241 8.241 0 0 0-16.483 0Z"
				fill="#00A2E7"
			/>
			<path
				d="M13.333 30.959c5.845 0 10.584-4.739 10.584-10.584S19.178 9.792 13.333 9.792 2.75 14.53 2.75 20.375 7.488 30.96 13.333 30.96Zm0-2.592a7.991 7.991 0 1 1 0-15.983 7.991 7.991 0 0 1 0 15.983Z"
				stroke="#00151E"
				strokeWidth={0.5}
			/>
		</g>
		<g filter="url(#b)">
			<path
				d="M28.51 11.333c0 5.707-4.626 10.334-10.333 10.334S7.844 17.04 7.844 11.333 12.47 1 18.177 1s10.334 4.626 10.334 10.333Zm-18.574 0a8.241 8.241 0 1 0 16.483 0 8.241 8.241 0 0 0-16.483 0Z"
				fill="#00A2E7"
			/>
			<path
				d="M18.177 21.917c5.845 0 10.584-4.739 10.584-10.584S24.021.75 18.177.75 7.594 5.488 7.594 11.333s4.738 10.584 10.583 10.584Zm0-2.592a7.991 7.991 0 1 1 0-15.983 7.991 7.991 0 0 1 0 15.983Z"
				stroke="#00151E"
				strokeWidth={0.5}
			/>
		</g>
		<g filter="url(#c)">
			<path
				d="M34 20.375c0 5.707-4.626 10.334-10.333 10.334s-10.334-4.627-10.334-10.334 4.627-10.333 10.334-10.333S34 14.668 34 20.375Zm-18.575 0a8.242 8.242 0 1 0 16.483 0 8.242 8.242 0 0 0-16.483 0Z"
				fill="#00A2E7"
			/>
			<path
				d="M23.667 30.959c5.845 0 10.583-4.739 10.583-10.584S29.512 9.792 23.667 9.792 13.083 14.53 13.083 20.375 17.822 30.96 23.667 30.96Zm0-2.592a7.991 7.991 0 1 1 0-15.983 7.991 7.991 0 0 1 0 15.983Z"
				stroke="#00151E"
				strokeWidth={0.5}
			/>
		</g>
		<defs>
			<filter
				id="a"
				x={0.5}
				y={9.542}
				width={23.667}
				height={23.667}
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx={-2} dy={2} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0.0835834 0 0 0 0 0.119271 0 0 0 1 0" />
				<feBlend
					in2="BackgroundImageFix"
					result="effect1_dropShadow_59_114"
				/>
				<feBlend
					in="SourceGraphic"
					in2="effect1_dropShadow_59_114"
					result="shape"
				/>
			</filter>
			<filter
				id="b"
				x={5.344}
				y={0.5}
				width={23.667}
				height={23.667}
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx={-2} dy={2} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0.0835834 0 0 0 0 0.119271 0 0 0 1 0" />
				<feBlend
					in2="BackgroundImageFix"
					result="effect1_dropShadow_59_114"
				/>
				<feBlend
					in="SourceGraphic"
					in2="effect1_dropShadow_59_114"
					result="shape"
				/>
			</filter>
			<filter
				id="c"
				x={10.833}
				y={9.542}
				width={23.667}
				height={23.667}
				filterUnits="userSpaceOnUse"
				colorInterpolationFilters="sRGB"
			>
				<feFlood floodOpacity={0} result="BackgroundImageFix" />
				<feColorMatrix
					in="SourceAlpha"
					values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
					result="hardAlpha"
				/>
				<feOffset dx={-2} dy={2} />
				<feComposite in2="hardAlpha" operator="out" />
				<feColorMatrix values="0 0 0 0 0 0 0 0 0 0.0835834 0 0 0 0 0.119271 0 0 0 1 0" />
				<feBlend
					in2="BackgroundImageFix"
					result="effect1_dropShadow_59_114"
				/>
				<feBlend
					in="SourceGraphic"
					in2="effect1_dropShadow_59_114"
					result="shape"
				/>
			</filter>
		</defs>
	</svg>
);

export default SvgComponent;
