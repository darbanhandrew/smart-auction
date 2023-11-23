import React from "react";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

export const BidCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  // const handleOnFinish = async (values: any) => {
  //   onFinish({
  //     ...values,
  //     user_id: values.user_profile
  //   });
  // }
  const { selectProps: auctionArtSelectProps } = useSelect({
    resource: "auction_art",
    optionLabel:"$id",
    pagination:{
      pageSize:1000
    }
  });
  //useList and get all user profiles for select
  const { data: userProfiles } = useList({
    resource: "user_profile",
    pagination: {
      pageSize: 1000,
    },
  });
  return (
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}
    title="ایجاد پیشنهاد"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Amount"
          name={["amount"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="وضعیت"
          name={["status"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="pending">در انتظار بررسی</Select.Option>
            <Select.Option value="accepted">پذیرفته شده</Select.Option>
            <Select.Option value="rejected">رد شده</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="اثر حراجی"
          name={["auction_art"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...auctionArtSelectProps} />
        </Form.Item>
        <Form.Item
          label="کاربر"
          name={["user_id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          {/*crate select and options from userProfiles */}
          <Select>
            {userProfiles?.data?.map((userProfile: any) => (
              <Select.Option value={userProfile.user_id}>
                {userProfile.first_name} {userProfile.last_name} - {userProfile.phone_number}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
