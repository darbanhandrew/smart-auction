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
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="start_price" title="Start Price" />
        <Table.Column dataIndex="end_price" title="End Price" />
        <Table.Column dataIndex="step_size" title="Step Size" />

        <Table.Column
          dataIndex="bid_step_category"
          title="Bid Step Category"
          render={(value: any) => (value ? value.name : "")}
        />

        <Table.Column
          title="Actions"
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
