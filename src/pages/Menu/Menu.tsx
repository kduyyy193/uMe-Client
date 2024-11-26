import { useState } from "react";
import cn from "utils/cn";

const Menu = () => {
  const [activeTab, setActiveTab] = useState<"category" | "menu">("category");
  return (
    <div className="m-4">
      <div className="relative">
        <div className="flex gap-8 ml-auto w-fit mr-8">
          <div
            onClick={() => setActiveTab("category")}
            className={`text-base font-medium py-1 px-2 rounded-lg cursor-pointer ${
              activeTab === "category" ? "text-purple-500" : "text-gray-500"
            }`}
          >
            Category
          </div>
          <div
            onClick={() => setActiveTab("menu")}
            className={`text-base font-medium py-1 px-2 rounded-lg cursor-pointer ${
              activeTab === "menu" ? "text-purple-500" : "text-gray-500"
            }`}
          >
            Menu
          </div>
        </div>
        <div
          className={cn(
            `absolute bottom-0 h-[2px] bg-purple-500 transition-all duration-300 ease-in-out translate-x-[-100%] ${
              activeTab === "category" ? "right-[50px] w-20" : "right-[-22px] w-[56px]"
            }`
          )}
        ></div>
      </div>
    </div>
  );
};

export default Menu;
