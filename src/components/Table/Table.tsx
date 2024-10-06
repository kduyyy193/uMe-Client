import Pagination from "components/Pagination";
import { Empty, Table as AntTable } from "antd";
import { SorterResult } from "antd/es/table/interface";
import type { TableProps } from "antd/es/table";
import "./table.css";

interface IProps<T> extends TableProps<T> {
  data: T[];
  page: number;
  rowPerPage: number;
  count: number;
  showRowPerPage?: boolean;
  bordered?: boolean;
  renderSummary?: (data: readonly T[]) => React.ReactNode;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  onTableChange?: (sorter: SorterResult<T> | SorterResult<T>[]) => void;
  onRowClick?: (record: T) => void;
}

const Table = <T extends object>({
  columns,
  data,
  rowKey,
  count,
  page,
  rowPerPage,
  onPageChange,
  onPerPageChange,
  onTableChange,
  onRowClick,
  renderSummary,
  showRowPerPage = true,
  bordered = true,
  ...props
}: IProps<T>) => {
  const handleChange: TableProps<T>["onChange"] = (_pagination, _filters, sorter) => {
    if (onTableChange) {
      onTableChange(sorter);
    }
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) onPageChange(page);
  };

  const handlePerPageChange = (perPage: number) => {
    if (onPerPageChange) onPerPageChange(perPage);
  };

  return (
    <div>
      <AntTable<T>
        rowKey={rowKey}
        onRow={(record) => {
          return {
            onClick: () => {
              if (onRowClick) onRowClick(record);
            },
          };
        }}
        locale={{
          emptyText: <Empty />,
        }}
        scroll={{ x: 1067 }}
        bordered={bordered}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        pagination={false}
        summary={renderSummary}
        {...props}
      />
      <div className="mt-3">
        {count !== 0 && (
          <Pagination
            count={count}
            pageCount={Math.ceil(count / rowPerPage)}
            page={page}
            rowPerPage={rowPerPage}
            showRowPerPage={showRowPerPage}
            onPageChange={handlePageChange}
            onRowPerPageChange={handlePerPageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
