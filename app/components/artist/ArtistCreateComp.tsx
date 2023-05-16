import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input,Select, InputNumber } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadImage } from "../upload_image/UploadImage";
export const ArtistCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [imageList, setImageList] = React.useState<UploadFile[]>([]);
  const [bannerList, setBannerList] = React.useState<UploadFile[]>([]);
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: imageList.length > 0 ? imageList[0].uid : undefined,
      banner: bannerList.length > 0 ? bannerList[0].uid : undefined,
    });
  };
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
        <h1>
          <b>Image</b>
        </h1>
        <UploadImage
          state={imageList}
          setState={(state) => setImageList(state)}
          name="image"
          maxCount={1}
        />
        <h1>Banner</h1>
        <UploadImage
          state={bannerList}
          setState={(state) => setBannerList(state)}
          name="banner"
          maxCount={1}
        />
        <Form.Item label="Status" name={["status"]}>
          <Select>
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="pending">Inactive</Select.Option>
            <Select.Option value="verified">Verified</Select.Option>
            <Select.Option value="unverified">Unverified</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="# of Artworks" name={["number_of_artworks"]}>
          <InputNumber />
        </Form.Item>
      </Form>
    </Create>
  );
};
