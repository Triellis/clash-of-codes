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
      d="M1 4.2h16M15.222 4.2v11.2c0 .424-.187.831-.52 1.131-.334.3-.786.469-1.258.469H4.556c-.472 0-.924-.169-1.258-.469-.333-.3-.52-.707-.52-1.131V4.2m2.666 0V2.6c0-.424.188-.831.521-1.131C6.3 1.169 6.751 1 7.222 1h3.556c.471 0 .923.169 1.257.469.333.3.52.707.52 1.131v1.6M7.222 8.2V13M10.778 8.2V13"
      stroke="#C53030"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
