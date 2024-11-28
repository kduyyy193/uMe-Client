import { useLocation } from "react-router-dom";
import cn from "utils/cn";

const Footer = () => {
  const location = useLocation();
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-white text-center mt-auto p-4 font-bold"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
      }}
    >
      {location.pathname === "/table-view" && (
        <div className="flex gap-8 mb-4">
          {STATUS.map((s) => (
            <div key={s.id} className="flex items-center gap-4 mx-auto w-fit">
              <div
                className={cn(
                  "w-4 h-4 bg-gray-500 rounded-[2px]",
                  s.id === 2 && "bg-blue-500",
                  s.id === 3 && "bg-purple-300"
                )}
              ></div>
              <span>{s.status}</span>
            </div>
          ))}
        </div>
      )}
      Copy © 2024 The TESFU BOYS
    </footer>
  );
};

export default Footer;

const STATUS = [
  {
    id: 1,
    status: "Trống",
  },
  {
    id: 2,
    status: "Đang ăn",
  },
  {
    id: 3,
    status: "Bán mang đi",
  },
];
