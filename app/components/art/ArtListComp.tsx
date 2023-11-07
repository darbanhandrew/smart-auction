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
import { Table, Space } from "antd";
import { storage } from "~/utility";
export const ArtListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable({
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
      children: "ایجاد اثر"
    }
    }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        {/* <Table.Column dataIndex={["artist", "name"]} title="هنرمند" /> */}
        <Table.Column dataIndex="name" title="نام" 
        sorter={{multiple:2}}
        defaultSortOrder={getDefaultSortOrder("name",sorter)}
        />
        <Table.Column
          dataIndex={["art_category", "name"]}
          title="دسته بندی"
        />
        <Table.Column
          dataIndex={["art_material", "name"]}
          title="متریال"
        />
        <Table.Column
          dataIndex={["art_technique", "name"]}
          title="تکنیک"
        />
        <Table.Column dataIndex="size" title="سایز" />
        <Table.Column
          dataIndex={["date_of_artwork"]}
          title="تاریخ خلق"
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["image"]}
          title="تصویر"
          render={(value: any) =>
            value ? (
              <img
                src={storage.getFilePreview("images", value, 64).toString()}
                width={64}
              />
            ) : (
              "No image"
            )
          }
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
              {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
