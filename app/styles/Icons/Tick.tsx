import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.752.635a.727.727 0 0 1 .068 1.026L5.638 13.297a.727.727 0 0 1-1.061.035L.213 8.97A.727.727 0 1 1 1.242 7.94l3.813 3.814L14.725.703a.727.727 0 0 1 1.027-.068Z"
      fill="#68D391"
    />
  </svg>
);

export default SvgComponent;
