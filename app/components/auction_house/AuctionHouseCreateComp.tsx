import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Button, Upload, Select, InputNumber } from "antd";
import dayjs from "dayjs";
import { storage } from "~/utility";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { ID } from "@refinedev/appwrite";
import { DatePicker } from "antd-jalali";

export const AuctionHouseCreateComp: React.FC<
  IResourceComponentsProps
> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
  //upload image on save button click and send the response.$id as image field to server
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const uploadFileAction = async (file: File) => {
    setFileList([
      {
        uid: "0",
        name: file.name,
        status: "uploading",
      },
    ]);
    const response = storage.createFile("images", ID.unique(), file);
    response
      .then((res) => {
        setFileList([
          {
            uid: res.$id,
            name: res.$id,
            status: "done",
            url: storage.getFilePreview("images", res.$id, 200).toString(),
          },
        ]);
      })
      .catch((err) => {
        setFileList([]);
      });
    return (await response).$id;
  };
  const handleOnFinish = async (values: any) => {
    onFinish({
      ...values,
      image: fileList.length > 0 ? fileList[0].uid : undefined,
    });
  };
  const { selectProps: auctionSelectProps } = useSelect({
    resource: "auction",
    optionLabel: "name",
  });

  return (
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
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
        <Upload.Dragger
          name="image"
          listType="picture"
          maxCount={1}
          action={uploadFileAction}
          fileList={fileList}
          onRemove={() => {
            storage.deleteFile("images", fileList[0].uid);
            setFileList([]);
          }}
        //show progress bar while action is in progress using onChnage
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload.Dragger>
        <Form.Item label="Auction" name={["auction"]}>
          <Select mode="multiple" {...auctionSelectProps} />
        </Form.Item>
        <Form.Item label="On going Auctions" name={["on_going_auctions"]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="وضعیت" name={["status"]}>
          <Select>
            <Select.Option value="live">Live</Select.Option>
            <Select.Option value="not_live">Closed</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Last Auction Date"
          name={["last_auction_date"]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
