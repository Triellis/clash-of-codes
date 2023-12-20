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
      stroke="#C53030"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 5.8h24M22.333 5.8v16.8c0 .636-.28 1.247-.78 1.697-.5.45-1.179.703-1.886.703H6.333a2.825 2.825 0 0 1-1.885-.703c-.5-.45-.781-1.06-.781-1.697V5.8m4 0V3.4c0-.637.28-1.247.78-1.697.5-.45 1.18-.703 1.886-.703h5.334c.707 0 1.385.253 1.885.703.5.45.781 1.06.781 1.697v2.4M10.333 11.8V19M15.667 11.8V19" />
    </g>
  </svg>
);

export default SvgComponent;
