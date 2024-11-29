import React from "react";
import ReactPaginate from "react-paginate";
import { Select } from "antd";
import "./pagination.css";

interface IProps {
  count: number;
  pageCount: number;
  page: number;
  rowPerPage: number;
  onPageChange: (page: number) => void;
  onRowPerPageChange: (value: number) => void;
  showRowPerPage?: boolean;
}

const Pagination: React.FC<IProps> = ({
  count,
  pageCount,
  page,
  rowPerPage,
  onPageChange,
  onRowPerPageChange,
  showRowPerPage = true,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page + 1);
  };

  const getTotalTitle = (count: number, page: number, rowPerPage: number) => {
    const start = page * rowPerPage + 1;

    const end = (page + 1) * rowPerPage;

    if (start > end || count === 0 || start > count) return "";

    if (count < end) {
      return `${start} - ${count} of ${count} items`;
    }
    return `${start} - ${end} of ${count} items`;
  };

  const handleRowPerPageChange = (value: number) => {
    onRowPerPageChange(value);
  };

  if (count === 0) return null;

  return (
    <div className="flex flex-col space-y-4 items-center md:flex-row md:space-y-0 md:justify-between">
      <div className="flex items-center space-x-2">
        {showRowPerPage && (
          <>
            <Select
              onChange={(value) => handleRowPerPageChange(value)}
              value={rowPerPage}
              size="middle"
              className="h-10"
            >
              <Select.Option value={10}>10 / page</Select.Option>
              <Select.Option value={20}>20 / page</Select.Option>
              <Select.Option value={30}>30 / page</Select.Option>
              <Select.Option value={40}>40 / page</Select.Option>
            </Select>
            <p>{getTotalTitle(count, page, rowPerPage)}</p>
          </>
        )}
      </div>
      <ReactPaginate
        previousClassName="previous-item"
        previousLabel={<i className="las la-angle-left text-sm px-1" />}
        nextClassName="next-item"
        nextLabel={<i className="las la-angle-right text-sm px-1" />}
        pageCount={pageCount}
        forcePage={page}
        onPageChange={({ selected }) => {
          handlePageChange(selected);
        }}
        pageClassName="pagination-item text-center duration-300 transition-all py-1 px-2.5 text-sm font-medium leading-normal rounded-md text-dark hover:!text-dark"
        containerClassName={"items-center right flex justify-center"}
        activeClassName={
          "active_link text-center duration-300 transition-all py-1 px-2.5 text-sm font-medium leading-normal bg-blue-400 text-white rounded-md text-white hover:!text-white"
        }
      />
    </div>
  );
};

export default Pagination;
