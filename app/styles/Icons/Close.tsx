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
      d="m18.75 6.82-1.57-1.57L12 10.43 6.82 5.25 5.25 6.82 10.43 12l-5.18 5.18 1.57 1.57L12 13.57l5.18 5.18 1.57-1.57L13.57 12l5.18-5.18Z"
      fill="#C53030"
    />
  </svg>
);

export default SvgComponent;
