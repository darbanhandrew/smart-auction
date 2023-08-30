import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BidStepListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="start_price" title="قیمت پایه"
          render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        />
        <Table.Column dataIndex="end_price" title="قیمت نهایی"
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
