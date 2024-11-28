import Table from "components/Table";
import useAsync from "hooks/useAsync";
import { useEffect, useState } from "react";
import { TOrderResponse } from "services/checkout/types";
import OrderService from "services/order";
import { ApiResponse } from "services/types";
import Columns from "./Columns";

const Receipt = () => {
  const getAllCheckoutAPI = useAsync<ApiResponse<TOrderResponse[]>>(OrderService.getReceiptList);

  const [receiptList, setReceiptList] = useState<TOrderResponse[]>([]);

  const getAllCategory = async () => {
    const response = await getAllCheckoutAPI.run();
    if (response?.data) {
      const dataAddedKey = response.data.map((menu, idx) => ({
        ...menu,
        key: idx + 1,
      }));
      setReceiptList(dataAddedKey);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="m-4">
      <Table
        scroll={{ x: "100%" }}
        columns={Columns()}
        data={receiptList}
        count={0}
        page={1}
        rowPerPage={10}
      />
    </div>
  );
};

export default Receipt;
