import * as React from "react";

const SvgComponent = (props: any) => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.5 0V4.5H10V5.5H5.5V10H4.5V5.5H0V4.5H4.5V0H5.5Z"
      fill="black"
    />
  </svg>
);

export default SvgComponent;
