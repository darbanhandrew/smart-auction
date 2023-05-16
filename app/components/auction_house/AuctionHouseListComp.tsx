import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Image } from "antd";
import { storage } from "~/utility";

export const AuctionHouseListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="name" title="Name" />

        {/*add a table column which can show the image using Antd image component. the component should load the image from the storage using image field value.*/}

        <Table.Column
          dataIndex={["image"]}
          title="Image"
          render={(value: any) =>
            value ? (
              <Image
                src={storage.getFilePreview("images", value, 200).toString()}
                width={200}
                height={200}
              />
            ) : (
              "No image"
            )
          }
        />

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
// create loader function to load the image from the storage using the image field value.
//create remix load function to load the image from the storage using the image field value.
