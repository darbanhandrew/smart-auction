import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  TagField,
  getDefaultSortOrder
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from "dayjs";
export const AuctionListComp: React.FC<IResourceComponentsProps> = () => {
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
      children:"ایجاد حراجی"
    }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="name" title="نام"
        sorter={{multiple:2}}
        defaultSortOrder={getDefaultSortOrder("name",sorter)}
         />
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
          sorter={{multiple:1}}
          defaultSortOrder={getDefaultSortOrder("start_date",sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        ></Table.Column>
        <Table.Column
          dataIndex={["start_date"]}
          title="تاریخ پایان"
          sorter={{multiple:3}}
          defaultSortOrder={getDefaultSortOrder("end_date",sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["$createdAt"]}
          title="تاریخ ایحاد سند"
          sorter={{multiple:4}}
          defaultSortOrder={getDefaultSortOrder("$createdAt",sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["$updatedAt"]}
          title="آخرین تغییر"
          sorter={{multiple:5}}
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
