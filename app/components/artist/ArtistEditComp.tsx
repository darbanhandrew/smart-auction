import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, InputNumber } from "antd";
import dayjs from "dayjs";
import { UploadFile } from "antd/lib/upload/interface";
import { UploadImage } from "../upload_image/UploadImage";
import { storage } from "~/utility";
export const ArtistEditComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [imageList, setImageList] = React.useState<UploadFile[]>([]);
  const [bannerList, setBannerList] = React.useState<UploadFile[]>([]);
  const artistData = queryResult?.data?.data;
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: imageList.length > 0 ? imageList[0].uid : undefined,
      banner: bannerList.length > 0 ? bannerList[0].uid : undefined,
    });
  };
  React.useEffect(() => {
    if (artistData) {
      artistData?.image &&
        setImageList([
          {
            uid: artistData.image,
            name: artistData.image,
            status: "done",
            url: storage
              .getFilePreview("images", artistData.image, 200)
              .toString(),
          },
        ]);
      artistData?.banner &&
        setBannerList([
          {
            uid: artistData.banner,
            name: artistData.banner,
            status: "done",
            url: storage
              .getFilePreview("images", artistData.banner, 200)
              .toString(),
          },
        ]);
    }
  }, [artistData]);

  return (
    <Edit
      title="ویرایش هنرمند"
      //change save button text 
      saveButtonProps={{
        ...saveButtonProps,
        children: "ذخیره",
      }}
      deleteButtonProps={{
        children:"حذف"
      }}
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <h1>
          <strong>{artistData?.id}</strong>
        </h1>
        <Form.Item
          label="نام و نام خانوادگی"
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
          <DatePicker picker="year"/>
        </Form.Item>
        <Form.Item
          label="تاریخ فوت"
          name={["date_of_death"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker picker="year"/>
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
        <h1>بنر</h1>
        <UploadImage
          state={bannerList}
          setState={(state) => setBannerList(state)}
          name="banner"
          maxCount={1}
        />
        <Form.Item label="وضعیت" name={["status"]}>
          <Select
            defaultValue={
              artistData?.status === "draft"
                ? "draft"
                : artistData?.status === "pending"
                  ? "pending"
                  : artistData?.status === "verified"
                    ? "verified"
                    : artistData?.status === "unverified"
                      ? "unverified"
                      : "draft"
            }
          >
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
    </Edit >
  );
};
