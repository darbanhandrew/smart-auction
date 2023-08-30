import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useMany,
  useOne,
} from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  NumberField,
  DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const AuctionArtShowComp: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;
  const { data: auctionData, isLoading: auctionIsLoading } = useOne({
    resource: "auction",
    id: record?.auction.$id || "",
    queryOptions: {
      enabled: !!record,
    },
  });
  const { data: artData, isLoading: artIsLoading } = useOne({
    resource: "art",
    id: record?.art.$id || "",
  });

  const { data: bidStepCategoryData, isLoading: bidStepCategoryIsLoading } =
    useOne({
      resource: "bid_step_category",
      id: record?.bid_step_category.$id || "",
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>شناسه</Title>
      <TextField value={record?.id} />
      <Title level={5}>Lot</Title>
      <NumberField value={record?.lot ?? ""} />
      <Title level={5}>Auction تاریخ شروع</Title>
      <DateField value={record?.auction_start_date} />
      <Title level={5}>Auction تاریخ پایان</Title>
      <DateField value={record?.auction_end_date} />
      <Title level={5}>Min Price</Title>
      <NumberField value={record?.min_price ?? ""} />
      <Title level={5}>Max Price</Title>
      <NumberField value={record?.max_price ?? ""} />
      <Title level={5}>Current Price</Title>
      <NumberField value={record?.current_price ?? ""} />
      <Title level={5}>Order</Title>
      <NumberField value={record?.order ?? ""} />
      <Title level={5}>$created At</Title>
      <DateField value={record?.$createdAt} />
      <Title level={5}>$updated At</Title>
      <DateField value={record?.$updatedAt} />
      <Title level={5}>Auction</Title>
      {auctionIsLoading ? <>Loading...</> : <>{auctionData?.data?.name}</>}
      <Title level={5}>Art</Title>
      {artIsLoading ? <>Loading...</> : <>{artData?.data?.name}</>}
      <Title level={5}>Bid Step Category</Title>
      {bidStepCategoryIsLoading ? (
        <>Loading...</>
      ) : (
        <>{bidStepCategoryData?.data?.name}</>
      )}
    </Show>
  );
};
