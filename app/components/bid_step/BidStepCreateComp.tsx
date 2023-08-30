import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useRadioGroup } from "@refinedev/antd";
import { Form, Input, Radio } from "antd";
import dayjs from "dayjs";
export const BidStepCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  //useCheckBoxGroup
  const { radioGroupProps: bidStepCategoryRadioGroupProps } = useRadioGroup({
    resource: "bid_step_category",
    optionLabel: "name",
  });
  return (
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Start Price"
          name={["start_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="End Price"
          name={["end_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Step سایز"
          name={["step_size"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bid Step Category"
          name={["bid_step_category"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group {...bidStepCategoryRadioGroupProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
