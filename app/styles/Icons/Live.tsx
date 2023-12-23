import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      fill="none"
      {...props}
    >
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }

          .blinking {
            animation: blink 1s infinite;
          }
        `}
      </style>
      <circle
        cx={11}
        cy={11}
        r={10.5}
        fill="#C53030"
        className="blinking" // Apply the blinking class
      />
    </svg>
  );
};

export default SvgComponent;
