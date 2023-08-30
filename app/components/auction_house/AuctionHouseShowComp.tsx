import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Image, Typography } from "antd";
import { storage } from "~/utility";

const { Title } = Typography;

export const AuctionHouseShowComp: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>شناسه</Title>
      <TextField value={record?.id} />
      {record?.image ? (
        <div>
          <Title level={5}>آواتار</Title>
          <Image
            src={storage
              .getFilePreview("images", record.image, undefined)
              .toString()}
          />
        </div>
      ) : null}
      <Title level={5}>نام</Title>
      <TextField value={record?.name} />
      <Title level={5}>$created At</Title>
      <DateField value={record?.$createdAt} />
      <Title level={5}>$updated At</Title>
      <DateField value={record?.$updatedAt} />
    </Show>
  );
};
