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
import { storage } from "~/utility";
import dayjs from "dayjs";
export const AuctionArtListComp: React.FC<IResourceComponentsProps> = () => {
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

  const { data: bidData, isLoading: bidIsLoading } = useMany({
    resource: "bid",
    ids: [].concat(...(tableProps?.dataSource?.map((item) => item?.bid) ?? [])),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List
    createButtonProps={{
      children:"ایجاد اثر حراجی"
    }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" />
        <Table.Column dataIndex={["art", "name"]} title="اثر" />
        <Table.Column dataIndex={["art", "artist"]} title="نام هنرمند"
          render={(artist:any) => 
            {
              const artistNames = artist.map((artist: any) => artist.name).join(" - ");
              if(artistNames) return artistNames;
              return "هنرمند ندارد"
            }
          }
         />
        <Table.Column dataIndex={["auction", "name"]} title="نام حراج" />
        <Table.Column dataIndex="lot" title="Lot"
        sorter={{multiple:2}}
        defaultSortOrder={getDefaultSortOrder("lot",sorter)} 
        />
        <Table.Column dataIndex="number_of_bids" title="تعداد بید"
        sorter={{multiple:1}}
        defaultSortOrder={getDefaultSortOrder("number_of_bids",sorter)} 
        />
        <Table.Column dataIndex="current_price" title="قیمت فعلی"
        sorter={{multiple:1}}
        render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        defaultSortOrder={getDefaultSortOrder("current_price",sorter)} 
        />
        <Table.Column
          dataIndex={["auction_start_date"]}
          title="تاریخ شروع"
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["auction_end_date"]}
          title="تاریخ پایان"
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
        />
        <Table.Column
          dataIndex={["art", "image"]}
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
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
