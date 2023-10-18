import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ArtistListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
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
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex="name" title="نام و نام خانوادگی" />

        <Table.Column
          dataIndex="art"
          title="تعداد آثار"
          render={(value: any[]) =>
            //show count
            value?.length
          }
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
