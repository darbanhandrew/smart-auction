import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd-jalali";
import { UploadFile } from "antd/lib/upload";
import { UploadImage } from "../upload_image/UploadImage";

export const AuctionCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [gallery, setGallery] = React.useState<UploadFile[]>([]);
  const [banner, setBanner] = React.useState<UploadFile[]>([]);
  const [thumbnails, setThumbnails] = React.useState<UploadFile[]>([]);
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      gallery: gallery.length > 0 ? gallery[0].uid : undefined,
      banner: banner.length > 0 ? banner[0].uid : undefined,
      thumbnails: thumbnails.length > 0 ? thumbnails[0].uid : undefined,
    });
  };
  const { selectProps: auctionArtSelectProps } = useSelect({
    resource: "auction_art",
    optionLabel: "lot",
  });
  const { selectProps: bidStepCategoryProps } = useSelect({
    resource: "bid_step_category",
    optionLabel: "name",
  });
  const { selectProps: auctionHouseSelectProps } = useSelect({
    resource: "auction_house",
    optionLabel: "name",
  });
  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
  });
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name={["start_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name={["end_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item label="Status" name={["status"]}>
          <Select>
            <Select.Option value="started">Started</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="finished">Finished</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Collector Name" name={["collector_name"]}>
          <Input />
        </Form.Item>
        <h1>Gallery</h1>
        <UploadImage
          state={gallery}
          setState={(state) => setGallery(state)}
          name="gallery"
          maxCount={1}
        />
        <h1> Thumbnails </h1>
        <UploadImage
          state={thumbnails}
          setState={(state) => setThumbnails(state)}
          name="thumbnails"
          maxCount={1}
        />
        <h1>Banner</h1>
        <UploadImage
          state={banner}
          setState={(state) => setBanner(state)}
          name="banner"
          maxCount={1}
        />
        <Form.Item label="Bid Step Category" name={["bid_step_category"]}>
          <Select {...bidStepCategoryProps} />
        </Form.Item>
        <Form.Item label="Auction House" name={["auction_house"]}>
          <Select {...auctionHouseSelectProps} />
        </Form.Item>
        <Form.Item label="Auction Art" name={["auction_art"]}>
          <Select mode="multiple" {...auctionArtSelectProps} />
        </Form.Item>
        <Form.Item label="Artists" name={["artist"]}>
          <Select mode="multiple" {...artistSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
