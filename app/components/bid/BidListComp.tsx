import React from "react";
import { IResourceComponentsProps, BaseRecord, useOne } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const BidListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  //load auction_art

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="amount" title="Amount" />
        <Table.Column dataIndex="status" title="Status" />

        <Table.Column
          title="Auction Art"
          render={(value: any) => {
            return value.auction_art.lot;
          }}
        />
        <Table.Column dataIndex={["user_id"]} title="User Id" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => <Space></Space>}
        />
      </Table>
    </List>
  );
};
