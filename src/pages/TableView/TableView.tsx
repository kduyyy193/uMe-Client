import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableService from "services/table";
import { TTableResponse } from "services/table/types";
import { ApiResponse } from "services/types";
import cn from "utils/cn";
import { io, Socket } from "socket.io-client";
import { playNotiSound } from "utils";
import { message } from "antd";
import { useStateContext } from "contexts/ContextProvider";

const TableView = () => {
  let socket: Socket;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStateContext();
  const getAllTablesAPI = useAsync<ApiResponse<TTableResponse[]>>(TableService.getAllTables);

  const [tables, setTables] = useState<TTableResponse[]>([]);

  const getAllTables = async () => {
    const response = await getAllTablesAPI.run();
    if (response?.data) {
      setTables(response.data);
    }
  };

  const handleNextOrder = (tableId: string) => {
    navigate("/table-details/" + tableId);
  };

  useEffect(() => {
    getAllTables();
  }, []);

  useEffect(() => {
    socket = io(import.meta.env.VITE_REACT_APP_URL);

    socket.on("connected", (data: string) => {
      console.log("Connected:", data);
    });

    socket.on("itemCompleted", (data: { message: string }) => {
      playNotiSound();
      message.success(`Ra lấy món ${data?.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user?.role === "Kitchen") {
      navigate("/kitchen");
    }
  }, [location.pathname]);

  return (
    <div className="flex items-center flex-wrap gap-20 w-auto mt-8 ml-8 pb-16">
      {tables?.map((table) => (
        <div
          key={table._id}
          onClick={() => handleNextOrder(table._id)}
          className={cn(
            "relative flex items-center justify-center rounded-2xl w-[200px] h-[200px] text-[40px] font-semibold text-white border-[10px] bg-gray-500 border-gray-300",
            table.isTakeaway && "border-purple-300",
            table.status === "occupied" && "border-blue-300"
          )}
        >
          <div
            className={cn(
              "w-[180px] h-[180px] rounded-lg flex items-center justify-center  bg-gray-500",
              table.isTakeaway && "bg-purple-500",
              table.status === "occupied" && "bg-blue-500"
            )}
          >
            {table.isTakeaway && (
              <span className="absolute top-2 right-2 font-semibold text-sm text-purple-900 bg-white p-1 rounded-lg ">
                Mang đi
              </span>
            )}
            <h3>{table?.tableNumber > 9 ? table?.tableNumber : "0" + table?.tableNumber}</h3>
            <span></span>
            <div
              className={cn(
                "w-20 h-4 rounded-tl-lg rounded-tr-lg absolute top-[-26px] bg-gray-200/35 border",
                table.isTakeaway && "bg-purple-500",
                table.status === "occupied" && "bg-blue-500"
              )}
            ></div>
            <div
              className={cn(
                "w-20 h-4 rounded-bl-lg rounded-br-lg absolute bottom-[-26px] bg-gray-200/35 border",
                table.isTakeaway && "bg-purple-500",
                table.status === "occupied" && "bg-blue-500"
              )}
            ></div>
            <div
              className={cn(
                "w-4 h-20 rounded-tl-lg rounded-bl-lg absolute left-[-26px] bg-gray-200/35 border",
                table.isTakeaway && "bg-purple-500",
                table.status === "occupied" && "bg-blue-500"
              )}
            ></div>
            <div
              className={cn(
                "w-4 h-20 rounded-tr-lg rounded-br-lg absolute right-[-26px] bg-gray-200/35 border",
                table.isTakeaway && "bg-purple-500",
                table.status === "occupied" && "bg-blue-500"
              )}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableView;
