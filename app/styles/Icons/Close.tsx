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
      d="M24 2.79 21.21 0 12 9.21 2.79 0 0 2.79 9.21 12 0 21.21 2.79 24 12 14.79 21.21 24 24 21.21 14.79 12 24 2.79Z"
      fill="#C53030"
    />
  </svg>
);

export default SvgComponent;
