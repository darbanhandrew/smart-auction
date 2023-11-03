import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  getDefaultSortOrder
} from "@refinedev/antd";
import dayjs from "dayjs";
import { Table, Space, Image } from "antd";
import { storage } from "~/utility";

export const AuctionHouseListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps,sorter } = useTable({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="name" title="نام" 
        sorter={{multiple:2}}
        defaultSortOrder={getDefaultSortOrder("name",sorter)}
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
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
// create loader function to load the image from the storage using the image field value.
//create remix load function to load the image from the storage using the image field value.
