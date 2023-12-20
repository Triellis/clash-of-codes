import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.627.452c.454.397.5 1.086.103 1.54L8.457 19.445a1.09 1.09 0 0 1-1.592.053L.32 12.953a1.09 1.09 0 0 1 1.542-1.542l5.721 5.72L22.088.554a1.09 1.09 0 0 1 1.54-.102Z"
      fill="#68D391"
    />
  </svg>
);

export default SvgComponent;
