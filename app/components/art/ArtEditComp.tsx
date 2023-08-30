import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { UploadImage } from "../upload_image/UploadImage";
import { UploadFile } from "antd/lib/upload";
import { storage } from "~/utility";

export const ArtEditComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  const [image, setImage] = React.useState<UploadFile[]>([]);
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: image.length > 0 ? image[0].uid : undefined,
    });
  };

  const artData = queryResult?.data?.data;
  React.useEffect(() => {
    if (artData) {
      artData?.image &&
        setImage([
          {
            uid: artData.image,
            name: artData.image,
            status: "done",
            url: storage
              .getFilePreview("images", artData.image, 200)
              .toString(),
          },
        ]);
    }
  }, [artData]);
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
  const { selectProps: auctionArtSelectProps } = useSelect({
    resource: "auction_art",
    optionLabel: "lot",
  });

  return (
    <Edit saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={handleOnFinish}
        initialValues={{
          ...formProps?.initialValues,
          // auction_art: artData?.auction_art?.map(
          //   (auctionArt: any) => auctionArt.$id
          // ),
          artist: artData?.artist?.$id,
          art_category: artData?.art_category?.$id,
          art_material: artData?.art_material?.$id,
          art_technique: artData?.art_technique?.$id,
        }}
      >
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
          label="توضیحات"
          name={["signature"]}
        >
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item
          label="تاریخ خلق"
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
          label="هنرمند"
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
          label="متریال"
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
          label="تکنیک"
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
          label="دسته بندی"
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
    </Edit>
  );
};
