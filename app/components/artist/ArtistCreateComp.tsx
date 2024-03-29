import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, DatePicker } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { UploadImage } from "../upload_image/UploadImage";
import dayjs from "dayjs";
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
    <Create
      //change the title of the page and the button text 
      title="ایجاد هنرمند جدید"
      //change save button props so the footer button will show ایجاد هنرمند جدید
      saveButtonProps={{
        ...saveButtonProps,
        children: "ذخیره",
      }}
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="نام و نا م خانوادگی"
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
          label="تاریخ تولد"
          name={["date_of_birth"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="تاریخ فوت"
          name={["date_of_death"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="بیوگرافی"
          name={["بیوگرافی"]}
        >
          <Input.TextArea autoSize={{ minRows: 5 }} />
        </Form.Item>
        <h1>
          <b>آواتار</b>
        </h1>
        <UploadImage
          state={imageList}
          setState={(state) => setImageList(state)}
          name="image"
          maxCount={1}
        />
        <h1>کاور</h1>
        <UploadImage
          state={bannerList}
          setState={(state) => setBannerList(state)}
          name="banner"
          maxCount={1}
        />
        <Form.Item label="وضعیت" name={["status"]}>
          <Select>
            <Select.Option value="draft">پیش نویس</Select.Option>
            <Select.Option value="pending">غیر فعال</Select.Option>
            <Select.Option value="verified">تایید شده</Select.Option>
            <Select.Option value="unverified">تایید نشده</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item label="# of Artworks" name={["number_of_artworks"]}>
          <InputNumber />
        </Form.Item> */}
      </Form>
    </Create >
  );
};
