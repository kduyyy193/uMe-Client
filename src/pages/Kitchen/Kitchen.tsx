import { Spin } from "antd";
import useAsync from "hooks/useAsync";
import React, { useEffect, useState } from "react";
import OrderService from "services/order";
import { ApiResponse } from "services/types";
import { io, Socket } from "socket.io-client";

const Kitchen: React.FC = () => {
  let socket: Socket;

  const getAllItemAPI = useAsync<ApiResponse<any>>(OrderService.getOrderItems);
  const updateStatusItemAPI = useAsync<ApiResponse<any>>(OrderService.updateStatusItem);

  const [itemList, setItemList] = useState<any>()

  const getAllItem  = async() => {
    const response = await getAllItemAPI.run()
    if (response?.data) {
      setItemList(response?.data)
    }
  }

  const handleChangeStatusItem = async (
    orderId: string,
    itemId: string,
    newStatus: string) => {
      await updateStatusItemAPI.run(orderId,itemId,newStatus)
      getAllItem()
  }

  const [message, setMessage] = useState<string>("");
  const [broadcastMessage, setBroadcastMessage] = useState<string>("");


  useEffect(() => {
    socket = io(import.meta.env.VITE_REACT_APP_URL);

    socket.on("connected", (data: string) => {
      console.log("Connected:", data);
      setMessage(data);
    });

    socket.on("serverResponse", (data: string) => {
      console.log("Server Response:", data);
    });

    socket.on("broadcastMessage", (data: { message: string }) => {
      console.log("Broadcast Message:", data.message);
      setBroadcastMessage(data.message);
    });

    socket.on("newOrder", (data: { message: string }) => {
      console.log("Broadcast Message:", data.message);
      getAllItem()
      setBroadcastMessage(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getAllItem()
  },[])

  const sendMessageToServer = () => {
    socket.emit('clientMessage', "Hello from React Client!");
  };

  return (
    <Spin spinning={getAllItemAPI.loading || updateStatusItemAPI.loading}>
        <div className="flex gap-10 mt-4">
        <div>
          <div className="w-[300px] bg-gray-400 text-white text-center text-lg p-2 rounded-lg">Mới</div>
          {itemList?.["new"]?.map((item: any,idx: number) => {
            return (
              <div key={idx} className="bg-gray-200 border border-gray-600 mt-2 rounded-2 p-4">
                <div>Tên bàn: <span className="font-semibold text-blue-500">{item?.tableName}</span></div>
                <div>Tên móm: <span className="font-semibold text-blue-500">{item?.menuItem}</span></div>
                <div>Số lượng: <span className="font-semibold text-blue-500">{item?.quantity}</span></div>
                <div className="w-full">
                <button className="block text-white bg-orange-500 px-2 py-1 rounded-lg mt-4 w-fit ml-auto" onClick={() => handleChangeStatusItem(item?.orderId, item?.itemId, 'INPROGRESS')}>Bắt đầu nấu</button>
                </div>
              </div>
            )
          })}
        </div>
        <div>
        <div className="w-[300px] bg-orange-500 text-white text-center text-lg p-2 rounded-lg">Đang nấu</div>
          {itemList?.["inprogress"]?.map((item: any,idx: number) => {
            return (
              
              <div key={idx} className="bg-gray-200 border border-gray-600 mt-2 rounded-2 p-4">
                <div>Tên bàn: <span className="font-semibold text-blue-500">{item?.tableName}</span></div>
                <div>Tên móm: <span className="font-semibold text-blue-500">{item?.menuItem}</span></div>
                <div>Số lượng: <span className="font-semibold text-blue-500">{item?.quantity}</span></div>
                <div className="w-full">
                <button className="block text-white bg-green-500 px-2 py-1 rounded-lg mt-4 w-fit ml-auto" onClick={() => handleChangeStatusItem(item?.orderId, item?.itemId, "DONE")}>Hoàn thành</button>
                </div>
              </div>
            )
          })}
        </div>
        <div>
        <div className="w-[300px] bg-blue-500 text-white text-center text-lg p-2 rounded-lg">Hoàn thành</div>
          {itemList?.["done"]?.map((item: any,idx: number) => {
            return (
              
              <div key={idx} className="bg-gray-200 border border-gray-600 mt-2 rounded-2 p-4">
                <div>Tên bàn: <span className="font-semibold text-blue-500">{item?.tableName}</span></div>
                <div>Tên móm: <span className="font-semibold text-blue-500">{item?.menuItem}</span></div>
                <div>Số lượng: <span className="font-semibold text-blue-500">{item?.quantity}</span></div>
                <div className="w-full">
                <button className="block text-white bg-orange-500 px-2 py-1 rounded-lg mt-4 w-fit ml-auto" onClick={() => console.log(item?.orderId, item?.itemId)}>Chuyển trạng thái</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Spin>
  );
};

export default Kitchen;
