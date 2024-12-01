import useAsync from "hooks/useAsync";
import html2canvas from "html2canvas-pro";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryService from "services/catergory";
import { TCategoryResponse } from "services/catergory/types";
import MenuService from "services/menu";
import { TMenuResponse } from "services/menu/types";
import TableService from "services/table";
import { TTableResponse } from "services/table/types";
import { ApiResponse } from "services/types";
import cn from "utils/cn";
import { numberToWords, speakText } from "utils/numberToWords";
import soundImg from "assets/images/sound.jpg";
import OrderService from "services/order";
import { TOrderResponse } from "services/order/types";
import { Checkbox, message, Spin } from "antd";
import CheckoutService from "services/checkout";
import PlusIcon from "assets/icons/PlusIcon";
import MinusIcon from "assets/icons/MinusIcon";
import _ from "lodash";
import { io, Socket } from "socket.io-client";
import { playNotiSound } from "utils";

const TableDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  let socket: Socket;
  const getAllCategoryAPI = useAsync<ApiResponse<TCategoryResponse[]>>(
    CategoryService.getAllCategories
  );
  const getTableByIdAPI = useAsync<ApiResponse<TTableResponse>>(TableService.getTableById);
  const getAllMenuAPI = useAsync<ApiResponse<TMenuResponse[]>>(MenuService.getAllMenusByCategory);
  const createOrderAPI = useAsync<ApiResponse<TOrderResponse>>(OrderService.createOrder);
  const updateOrderAPI = useAsync<ApiResponse<TOrderResponse>>(OrderService.updateOrder);
  const getOrderByTableIdAPI = useAsync<ApiResponse<TOrderResponse>>(
    OrderService.getOrderByTableId
  );
  const checkoutAPI = useAsync<ApiResponse<TOrderResponse>>(CheckoutService.checkoutOrder);

  const [order, setOrder] = useState<TOrderResponse>();
  const [table, setTable] = useState<TTableResponse>();
  const [category, setCategory] = useState<TCategoryResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<TCategoryResponse>();
  const [menu, setMenu] = useState<TMenuResponse[]>([]);
  const [orderMenu, setOrderMenu] = useState<TMenuResponse[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "NONE" | "CREDIT_CARD">("CASH");
  const receiptRef = useRef(null);

  const getAllCategory = async () => {
    const response = await getAllCategoryAPI.run();
    if (response?.data) {
      const categoryAddedKey = response?.data.map((d, idx) => ({ ...d, key: idx + 1 }));
      getAllMenuByCategoryId(categoryAddedKey?.[0]._id);
      setCategory(categoryAddedKey || []);
    }
  };

  const getAllCategoryById = async () => {
    const response = await getTableByIdAPI.run(id);
    if (response?.data) {
      setTable(response?.data);
    }
  };

  const getAllMenuByCategoryId = async (categoryId: string) => {
    const response = await getAllMenuAPI.run(categoryId);
    if (response?.data) {
      const menuWithKeys = response.data.map((menu, idx) => ({
        ...menu,
        key: idx + 1,
      }));
      setMenu(menuWithKeys);
    }
  };

  const getOrderByTableId = async (tableId: string) => {
    const response = await getOrderByTableIdAPI.run(tableId);
    if (response?.data) {
      setOrder(response.data);
      setOrderMenu(response.data?.items);
    }
  };

  const handleIncreaItem = (itemId: string) => {
    const newOrder = orderMenu?.map((item) => {
      if (item._id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setOrderMenu(newOrder);
  };

  const handleDecreaItem = (itemId: string) => {
    const newOrder = orderMenu
      ?.map((item) => {
        if (item._id === itemId) {
          if (item.quantity === 1) {
            return null;
          }
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      })
      .filter((item) => item !== null);

    setOrderMenu(newOrder);
  };

  const handleSelectCategory = (c: TCategoryResponse) => {
    setSelectedCategory(c);
    getAllMenuByCategoryId(c._id);
  };

  const handleSelectMenu = (m: TMenuResponse) => {
    setOrderMenu((prev) => {
      const existedItem = prev.find((value) => value._id === m._id);
      if (existedItem) {
        return prev.map((item) =>
          item._id === m._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          ...m,
          quantity: 1,
          status: "NEW",
        },
      ];
    });
  };
  const hanelCheckout = async () => {
    if (!order?._id) {
      const response = await createOrderAPI.run(id, orderMenu, table?.isTakeaway);
      if (response?.data) {
        getOrderByTableId(id as string);
        return message.success("Tạo đơn thành công");
      }
      message.error("Đã xảy ra lỗi");
    } else {
      if (areArraysNotEqual) {
        const response = await updateOrderAPI.run(order._id, orderMenu, table?.isTakeaway);
        if (response?.data) {
          getOrderByTableId(id as string);
          return message.success("Tạo đơn thành công");
        }
        message.error("Đã xảy ra lỗi");
      } else {
        const response = await checkoutAPI.run(order?._id, paymentMethod);
        if (response?.data) {
          setOrder(undefined);
          setOrderMenu([]);
          downloadReceipt();
          navigate("/table-view");
          return message.success("Thanh toán thành công");
        }
        message.error("Đã xảy ra lỗi");
      }
    }
  };

  useEffect(() => {
    if (!id) return;
    getAllCategory();
    getAllCategoryById();
    getOrderByTableId(id);
  }, [id]);

  const areArraysNotEqual =
    orderMenu.length !== getOrderByTableIdAPI?.value?.data?.items.length ||
    !orderMenu.every((item, index) =>
      _.isEqual(item, getOrderByTableIdAPI?.value?.data?.items[index])
    );

  const downloadReceipt = () => {
    if (receiptRef.current) {
      console.log("object");
      html2canvas(receiptRef.current).then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "receipt.png";
        link.click();
      });
    }
  };

  useEffect(() => {
    socket = io(import.meta.env.VITE_REACT_APP_URL);

    socket.on("connected", (data: string) => {
      console.log("Connected:", data);
    });

    socket.on("itemInProgress", () => {
      getOrderByTableId(id as string);
    });

    socket.on("itemCompleted", (data: { message: string }) => {
      getOrderByTableId(id as string);
      playNotiSound();
      message.success(`Ra lấy món ${data?.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Spin spinning={checkoutAPI.loading || createOrderAPI.loading || getAllCategoryAPI.loading}>
      <div className="m-4 flex">
        <div className="grow mr-4 max-w-[calc(100%-600px)]">
          <div className="mt-4 font-semibold">Chọn danh mục</div>
          <div className="flex gap-4 flex-wrap mt-4 pb-4">
            {category.map((c) => {
              return (
                <div
                  key={c._id}
                  onClick={() => handleSelectCategory(c)}
                  className={cn(
                    "bg-blue-200 px-2 py-1 rounded-lg text-[#00000d] text-base font-medium cursor-pointer",
                    selectedCategory?._id === c._id && "bg-blue-400 text-white"
                  )}
                >
                  {c.name}
                </div>
              );
            })}
          </div>
          <div className="mt-4 font-semibold">Chọn món ăn</div>
          {menu?.length > 0 ? (
            <div className="flex gap-4 flex-wrap mt-4">
              {menu.map((m) => {
                return (
                  <div
                    key={m._id}
                    onClick={() => handleSelectMenu(m)}
                    className={cn(
                      "bg-blue-400 px-2 py-1 rounded-lg text-white text-base font-medium cursor-pointer"
                    )}
                  >
                    {m.name}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>Không có món ăn nào để chọn</div>
          )}
        </div>
        <div className="w-[2px] absolute right-[600px] min-h-[90vh] z-0 bg-gray-700"></div>
        {!checkoutAPI.loading && (
          <div className="w-[568px] max-h-[500px] m-4">
            <div className="text-center">UseMe App</div>
            <div className="text-center text-lg font-semibold">
              Đơn hàng của bàn {table?.tableNumber}
            </div>
            <div className="mt-4 ml-4">
              {orderMenu?.map((m) => {
                return (
                  <div key={m._id} className="mt-2">
                    <div className="flex items-center">
                      <span>{`${m.quantity}x`}</span>
                      <div className="ml-4">{m.name}</div>
                      <div className="w-fit ml-auto text-blue-500 font-medium">
                        {(m.quantity * m.price)?.toLocaleString()} VND
                      </div>
                      <div onClick={() => handleIncreaItem(m._id)}>
                        <PlusIcon height="28px" />
                      </div>
                      {m.status === "NEW" && (
                        <div onClick={() => handleDecreaItem(m._id)}>
                          <MinusIcon height="28px" />
                        </div>
                      )}
                      <div>
                        {m.status === "NEW"
                          ? "Mới"
                          : m.status === "INPROGRESS"
                            ? "Đang nấu"
                            : "Thành món"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {order?._id && (
              <div className="m-4 fixed bottom-[120px]">
                <Checkbox
                  className="!mr-4"
                  onChange={() => setPaymentMethod("CASH")}
                  checked={paymentMethod === "CASH"}
                >
                  <span className="text-lg">Tiền mặt</span>
                </Checkbox>
                <Checkbox
                  className="!mr-4"
                  onChange={() => setPaymentMethod("CREDIT_CARD")}
                  checked={paymentMethod === "CREDIT_CARD"}
                >
                  <span className="text-lg">Thẻ</span>
                </Checkbox>
                <Checkbox
                  className="!mr-4"
                  onChange={() => setPaymentMethod("NONE")}
                  checked={paymentMethod === "NONE"}
                >
                  <span className="text-lg">Khác</span>
                </Checkbox>
              </div>
            )}
            <div className="mt-4 ml-4">
              <div className="flex">
                <span className="font-semibold">Tổng tiền:</span>
                <div className="w-fit ml-auto text-blue-500 font-semibold">
                  {orderMenu
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    ?.toLocaleString()}{" "}
                  VND
                </div>
              </div>
              {orderMenu.length > 0 ? (
                <div className="text-center mt-1">
                  <p className="capitalize">
                    (
                    {numberToWords(
                      orderMenu.reduce((total, item) => total + item.price * item.quantity, 0)
                    )}
                    )
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        )}
        {checkoutAPI.loading && (
          <div ref={receiptRef} className="w-[568px] max-h-[500px] m-4 px-4 py-8">
            <div className="text-center">UseMe App</div>
            <div className="text-center text-lg font-semibold">
              Hoá đơn thanh toán của bàn {table?.tableNumber}
            </div>
            <div className="mt-4 ml-4">
              {orderMenu?.map((m) => {
                return (
                  <div key={m._id} className="mt-2">
                    <div className="flex items-center">
                      <span>{`${m.quantity}x`}</span>
                      <div className="ml-4">{m.name}</div>
                      <div className="w-fit ml-auto text-blue-500 font-medium">
                        {(m.quantity * m.price)?.toLocaleString()} VND
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 ml-4">
              <div className="flex">
                <span className="font-semibold">Tổng tiền:</span>
                <div className="w-fit ml-auto text-blue-500 font-semibold">
                  {orderMenu
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    ?.toLocaleString()}{" "}
                  VND
                </div>
              </div>
              {orderMenu.length > 0 ? (
                <div className="text-center mt-1">
                  <p className="capitalize">
                    (
                    {numberToWords(
                      orderMenu.reduce((total, item) => total + item.price * item.quantity, 0)
                    )}
                    )
                  </p>
                </div>
              ) : null}
            </div>
            <div className="mt-6">Trân trọng cảm ơn quý khách</div>
          </div>
        )}
        <button
          onClick={hanelCheckout}
          disabled={orderMenu.length === 0}
          className={cn(
            "fixed bottom-[54px] right-0 w-[600px] bg-blue-500 text-[20px] font-semibold cursor-pointer text-white p-4",
            orderMenu.length === 0 && "bg-gray-400"
          )}
        >
          {order?._id && !areArraysNotEqual ? "Thanh toán" : "Xác nhận"}
        </button>
        <button
          className="absolute right-4 top-0 text-xs font-semibold"
          onClick={() =>
            speakText(
              numberToWords(
                orderMenu.reduce((total, item) => total + item.price * item.quantity, 0)
              )
            )
          }
        >
          <img className="w-5 h-5" src={soundImg} alt="READ" />
        </button>
      </div>
    </Spin>
  );
};

export default TableDetails;
