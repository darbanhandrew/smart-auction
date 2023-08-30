import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  TagField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from "dayjs";
export const AuctionListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="name" title="نام" />
        {/* 
        <Table.Column
          dataIndex={["bid_step_category", "name"]}
          title="Bid Step Category"
        /> */}
        <Table.Column
          dataIndex="auction_art"
          title="تعداد آثار"
          render={(value: any[]) => value?.length}
        />
        <Table.Column
          dataIndex={["start_date"]}
          title="تاریخ شروع"
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        ></Table.Column>
        <Table.Column
          dataIndex={["start_date"]}
          title="تاریخ پایان"
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
