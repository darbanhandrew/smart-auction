import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd-jalali";
import { UploadFile } from "antd/lib/upload";
import { UploadImage } from "../upload_image/UploadImage";

export const ArtCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [image, setImage] = React.useState<UploadFile[]>([]);
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: image.length > 0 ? image[0].uid : undefined,
    });
  };
  // const { selectProps: auctionArtSelectProps } = useSelect({
  //   resource: "auction_art",
  //   optionLabel: "lot",
  // });

  const { selectProps: artistSelectProps } = useSelect({
    resource: "artist",
    optionLabel: "name",
  });

  const { selectProps: artCategorySelectProps } = useSelect({
    resource: "art_category",
    optionLabel: "name",

  });

  const { selectProps: artTechniqueSelectProps } = useSelect({
    resource: "art_technique",
    optionLabel: "name",
  });

  const { selectProps: artMaterialSelectProps } = useSelect({
    resource: "art_material",
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
          label="Size"
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
          label="Signature"
          name={["signature"]}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item
          label="Date Of Artwork"
          name={["date_of_artwork"]}
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
        <UploadImage
          state={image}
          setState={(state) => setImage(state)}
          name="image"
          maxCount={1}
        />
        <Form.Item
          label="Artist"
          name={"artist"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artistSelectProps} />
        </Form.Item>
        <Form.Item
          label="Art Material"
          name={"art_material"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artMaterialSelectProps} />
        </Form.Item>
        <Form.Item
          label="Art Technique"
          name={"art_technique"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artTechniqueSelectProps} />
        </Form.Item>
        <Form.Item
          label="Art Category"
          name={"art_category"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artCategorySelectProps} />
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
