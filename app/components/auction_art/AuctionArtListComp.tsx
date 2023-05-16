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

export const AuctionArtListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: bidData, isLoading: bidIsLoading } = useMany({
    resource: "bid",
    ids: [].concat(...(tableProps?.dataSource?.map((item) => item?.bid) ?? [])),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="Id" />
        <Table.Column dataIndex="lot" title="Lot" />
        <Table.Column
          dataIndex={["auction_start_date"]}
          title="Auction Start Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["auction_end_date"]}
          title="Auction End Date"
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex="min_price" title="Min Price" />
        <Table.Column dataIndex="max_price" title="Max Price" />
        <Table.Column dataIndex="current_price" title="Current Price" />
        <Table.Column dataIndex="order" title="Order" />

        <Table.Column dataIndex={["auction", "name"]} title="Auction" />
        <Table.Column dataIndex={["art", "name"]} title="Art" />
        <Table.Column
          dataIndex={["bid_step_category", "name"]}
          title="Bid Step Category"
        />
        <Table.Column
          dataIndex="bid"
          title="Bid"
          render={(value: any[]) =>
            bidIsLoading ? (
              <>Loading...</>
            ) : (
              <>
                {value?.map((item, index) => (
                  <TagField key={index} value={item} />
                ))}
              </>
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
