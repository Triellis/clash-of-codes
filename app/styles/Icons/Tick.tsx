import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.994 5.436a.75.75 0 0 1 .07 1.058l-10.5 12a.75.75 0 0 1-1.094.036l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.933 3.933 9.973-11.397a.75.75 0 0 1 1.058-.07Z"
      fill="#68D391"
    />
  </svg>
);

export default SvgComponent;
