import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 25h12M19 1.87A2.76 2.76 0 0 1 21 1c.371 0 .74.077 1.082.226.344.15.655.369.918.645s.471.604.613.965a3.105 3.105 0 0 1 0 2.276c-.142.36-.35.688-.613.964L6.333 23.598 1 25l1.333-5.607L19 1.871Z" />
    </g>
  </svg>
);

export default SvgComponent;
