import { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="22"
    height="16"
    viewBox="0 0 22 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <line x1="1" y1="1" x2="21" y2="1" stroke="#363636" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="8" x2="21" y2="8" stroke="#363636" strokeWidth="2" strokeLinecap="round" />
    <line x1="1" y1="15" x2="21" y2="15" stroke="#363636" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export default MenuIcon;