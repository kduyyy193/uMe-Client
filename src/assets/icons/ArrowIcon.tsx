import { SVGProps } from "react";

const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      stroke="#141414"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M8.156 4.219 3.094 9.28l5.062 5.063m6.75-5.063H3.094"
    />
  </svg>
);
export default ArrowIcon;
