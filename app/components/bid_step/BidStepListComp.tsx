import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  TagField,
  getDefaultSortOrder
} from "@refinedev/antd";
import dayjs from "dayjs";
import { Table, Space } from "antd";

export const BidStepListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps,sorter } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field:"$createdAt",
          order:"desc"
        },
      ]
    }
  });
  return (
    <List
    createButtonProps={{
      children:"ایجاد بید استپ"
    }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="start_price" title="قیمت پایه"
          sorter={{multiple:3}}
          defaultSortOrder={getDefaultSortOrder("start_price",sorter)}
          render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        />
        <Table.Column dataIndex="end_price" title="قیمت نهایی"
          defaultSortOrder={getDefaultSortOrder("end_price",sorter)}
          sorter={{multiple:4}}
          render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        />
        <Table.Column dataIndex="step_size" title="اندازه گام"
          render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        />

        <Table.Column
          dataIndex="bid_step_category"
          title="گروه بید استپ"
          render={(value: any) => (value ? value.name : "")}
        />
        <Table.Column
          dataIndex={["$createdAt"]}
          title="تاریخ ایحاد سند"
          sorter={{multiple:1}}
          defaultSortOrder={getDefaultSortOrder("$createdAt",sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["$updatedAt"]}
          title="آخرین تغییر"
          sorter={{multiple:3}}
          defaultSortOrder={getDefaultSortOrder("$updatedAt",sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          title="عملیات"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
