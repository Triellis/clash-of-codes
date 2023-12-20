import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      d="M16 1.86 14.14 0 8 6.14 1.86 0 0 1.86 6.14 8 0 14.14 1.86 16 8 9.86 14.14 16 16 14.14 9.86 8 16 1.86Z"
      fill="#C53030"
    />
  </svg>
);

export default SvgComponent;
