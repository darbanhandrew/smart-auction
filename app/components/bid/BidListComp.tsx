import React, { useEffect } from "react";
import { IResourceComponentsProps, BaseRecord, useOne, useList } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  DeleteButton,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from "dayjs";
import { databases } from "~/utility";
export const BidListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable({
    syncWithLocation: true,
    sorters: {
      mode: "server",
      initial: [
        {
          field: "id",
          order: "desc",
        },

      ]
    }
  });
  //get all user profiles and all arts
  const { data: arts } = useList({
    resource: "art",
    pagination:
    {
      pageSize:1000,
    },
  });
  useEffect(()=>{
  },[arts]);
  // const { data: userProfiles } = useList({
  //   resource: "user_profile",
  // });
  return (
    <List
    createButtonProps={{
      children:"ایجاد پیشنهاد"
    }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="شناسه" defaultSortOrder={
          getDefaultSortOrder("id", sorter)} sorter={{multiple:2}} />
        <Table.Column dataIndex="amount" title="مبلغ پیشنهادی"
          sorter={{multiple:1}}
          defaultSortOrder={getDefaultSortOrder("amount", sorter)}
          render={(value: any) => <span><>{value.toLocaleString('fa-IR')} تومان</></span>}
        />
        <Table.Column dataIndex="status" title="وضعیت"
          render={(value: any) => {
            if (value === "accepted") {
              return "پذیرفته شده";
            }
            if (value === "rejected") {
              return "رد شده";
            }
            return "در انتظار بررسی";
          }
          }
          sorter={{multiple:3}}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
        />
        <Table.Column
          title="نام اثر"
          dataIndex={["auction_art", "art", "name"]}
        />
        <Table.Column
          title="زمان ثبت بید"
          dataIndex={["$createdAt"]}
          sorter={{multiple:4}}
          defaultSortOrder={getDefaultSortOrder("$createdAt", sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD HH:MM:ss")}</></span>}
        />
        <Table.Column
          title="زمان تعیین وضعیت بید"
          dataIndex={["$updatedAt"]}
          sorter={{multiple:5}}
          defaultSortOrder={getDefaultSortOrder("$updatedAt", sorter)}
          render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD HH:MM:ss")}</></span>}
        />
        {/* <Table.Column
          title="نام کاربر"
          dataIndex={["user_id"]}
          //find the user profile object from user profiles using user id
          render={(value: any) => {
            const userProfile = userProfiles?.data?.find((userProfile: any) => userProfile.user_id == value);
            // return user profile email
            if (userProfile) {
              return `${userProfile.first_name} ${userProfile.last_name} - ${userProfile.phone_number}`;
            }
            return "";
          }}
        /> */}
<Table.Column
  title="نام هنرمند"
  dataIndex={["auction_art", "art"]}
  // get the artist name from the art id using useOne
  render={(art) => {
    // find the art object from arts using art id 
    const artId = art.$id.toString();
    if(artId)
    {
      if(arts != undefined && arts.data)
      {
        for (let i = 0; i < arts.data.length; i++) {
          if(arts.data[i].id == artId){
            const artistNames = arts.data[i].artist.map((artist: any) => artist.name).join(" - ");
            return artistNames;
          }
          
        }
      }
    }
    return "در حال بارگذاری...";
  }}
  />
        {/* <Table.Column dataIndex={["user_id"]} title="کاربر شناسه" /> */}
        <Table.Column
          title="عملیات"
          dataIndex="actions"
          render={(_, record: BaseRecord) =>
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              {/* <ShowButton hideText size="small" recordItemId={record.id} /> */}
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          }
        />
      </Table>
    </List>
  );
};
