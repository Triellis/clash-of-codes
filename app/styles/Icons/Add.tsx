import * as React from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M5.5 0v4.5H10v1H5.5V10h-1V5.5H0v-1h4.5V0h1Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
