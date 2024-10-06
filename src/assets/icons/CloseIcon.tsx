import { SVGProps } from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line
      x1="1.22266"
      y1="15.1424"
      x2="15.3648"
      y2="1.00029"
      stroke="#363636"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="1.41421"
      y1="1.22168"
      x2="15.5563"
      y2="15.3638"
      stroke="#363636"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
export default CloseIcon;
