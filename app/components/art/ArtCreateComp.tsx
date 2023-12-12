import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { AutoComplete, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd-jalali";
import { UploadFile } from "antd/lib/upload";
import { UploadImage } from "../upload_image/UploadImage";

export const ArtCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [image, setImage] = React.useState<UploadFile[]>([]);
  const [gallery, setGallery] = React.useState<UploadFile[]>([]);
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: image.length > 0 ? image[0].uid : undefined,
      gallery: gallery.length > 0 ? gallery.map((item: any) => item.uid) : [],
      // artist: values.artist.length > 0 ? values.artist.map((item: any) => item) : [],
    });
  };
  // const { selectProps: auctionArtSelectProps } = useSelect({
  //   resource: "auction_art",
  //   optionLabel: "lot",
  // });

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
    onSearch: (value: string) => [
      {
        field: "name",
        operator: "contains",
        value,
      },
    ],
  });

  const { selectProps: artCategorySelectProps } = useSelect({
    resource: "art_category",
    optionLabel: "name",
    onSearch: (value: string) => [
      {
        field: "name",
        operator: "contains",
        value,
      },
    ],
  });

  const { selectProps: artTechniqueSelectProps } = useSelect({
    resource: "art_technique",
    optionLabel: "name",
    onSearch: (value: string) => {
      if (value != undefined || value=="") {
        return [
          {
            field: "name",
            operator: "contains",
            value,
          },
        ];
      }
    else {
      return [];
    }
    }
  });

  const { selectProps: artMaterialSelectProps } = useSelect({
    resource: "art_material",
    optionLabel: "name",
    onSearch: (value: string) => [
      {
        field: "name",
        operator: "contains",
        value,
      },
    ],
  });

  return (
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}
      title="ایجاد اثر"
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="نام"
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
          label="سایز"
          name={["size"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="توضیح"
          name={["description"]}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item
          label="امضا"
          name={["signature"]}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item
          label="تاریخ خلق"
          name={["date_of_artwork"]}
          rules={[
            {
              required: false,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker
            picker="year"
          />
        </Form.Item>
        <UploadImage
          state={image}
          setState={(state) => setImage(state)}
          name="image"
          maxCount={1}
        />
        <h2>
          گالری
        </h2>
        <UploadImage
          state={gallery}
          setState={(state) => setGallery(state)}
          name="gallery"
          maxCount={5}
        />
        <Form.Item
          label="هنرمند"
          name={"artist"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artistSelectProps} mode="multiple" />
        </Form.Item>
        <Form.Item
          label="متریال"
          name={"art_material"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artMaterialSelectProps} allowClear={true} />
        </Form.Item>
        <Form.Item
          label="تکنیک"
          name={"art_technique"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artTechniqueSelectProps} allowClear={true} />
        </Form.Item>
        <Form.Item
          label="دسته بندی"
          name={"art_category"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artCategorySelectProps} allowClear={true} />
        </Form.Item>
        {/* <Form.Item
          label="Auction Art"
          name={"auction_art"}
        >
          <Select mode="multiple" {...auctionArtSelectProps} />
        </Form.Item> */}
      </Form>
    </Create>
  );
};
