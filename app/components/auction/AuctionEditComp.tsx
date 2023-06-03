import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, Breadcrumb } from "antd";
import dayjs from "dayjs";
import { UploadImage } from "../upload_image/UploadImage";
import { UploadFile } from "antd/lib/upload";
import { storage } from "~/utility";
import { TimePicker } from "antd-jalali";

export const AuctionEditComp: React.FC<IResourceComponentsProps> = () => {
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
  const auctionData = queryResult?.data?.data;
  React.useEffect(() => {
    if (auctionData) {
      auctionData?.gallery ?
        setGallery([
          {
            uid: auctionData.gallery,
            name: auctionData.gallery,
            status: "done",
            url: storage
              .getFilePreview("images", auctionData.gallery, 200)
              .toString(),
          },
        ]) : setGallery([]);
      auctionData?.banner ?
        setBanner([
          {
            uid: auctionData.banner,
            name: auctionData.banner,
            status: "done",
            url: storage
              .getFilePreview("images", auctionData.banner, 200)
              .toString(),
          },
        ]) : setBanner([]);
      auctionData?.thumbnails ?
        setThumbnails([
          {
            uid: auctionData.thumbnails,
            name: auctionData.thumbnails,
            status: "done",
            url: storage
              .getFilePreview("images", auctionData.thumbnails, 200)
              .toString(),
          },
        ]) : setThumbnails([]);
    }
  }, [auctionData]);

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      //change the title Edit to Auction Edit
      title="ویرایش حراجی"
    //change the edit part of breadcrumb
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={handleOnFinish}
        initialValues={{
          ...formProps?.initialValues,
          auction_art: auctionData?.auction_art?.map(
            (auctionArt: any) => auctionArt.$id
          ),
          artist: auctionData?.artist?.map((artist: any) => artist.$id),
          auction_house: auctionData?.auction_house?.$id,
          bid_step_category: auctionData?.bid_step_category?.$id,
        }}
      >
        <h1>
          <strong>{auctionData?.id}</strong>
        </h1>
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
          label="Auction Type"
          name={["auction_type"]}
        >
          <Select>
            <Select.Option value="Time_Based">Time Based</Select.Option>
            <Select.Option value="Series">Series</Select.Option>
          </Select>
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
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
          />
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
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
          />
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
        <Form.Item label="Auction Arts" name={["auction_art"]}>
          <Select mode="multiple" {...auctionArtSelectProps} />
        </Form.Item>
        <Form.Item label="Artists" name={["artist"]}>
          <Select mode="multiple" {...artistSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
