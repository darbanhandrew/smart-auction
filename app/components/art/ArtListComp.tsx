import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ArtListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />

        <Table.Column dataIndex="size" title="Size" />
        <Table.Column
          dataIndex={["date_of_artwork"]}
          title="Date Of Artwork"
          render={(value: any) => <DateField value={value} />}
        />

        <Table.Column
          dataIndex={["art_category", "name"]}
          title="Art Category"
        />
        <Table.Column
          dataIndex={["art_material", "name"]}
          title="Art Material"
        />
        <Table.Column
          dataIndex={["art_technique", "name"]}
          title="Art Technique"
        />
        <Table.Column dataIndex={["artist", "name"]} title="Artist" />

        <Table.Column
          title="Actions"
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
