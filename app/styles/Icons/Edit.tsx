import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      d="M9 17h8M13 1.58A1.84 1.84 0 0 1 14.333 1c.248 0 .493.051.722.15.229.1.437.247.612.43.175.185.314.403.408.644a2.07 2.07 0 0 1 0 1.517 1.99 1.99 0 0 1-.408.643L4.556 16.065 1 17l.889-3.738L13 1.581Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
