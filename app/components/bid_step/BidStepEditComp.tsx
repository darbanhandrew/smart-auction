import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useRadioGroup } from "@refinedev/antd";
import { Form, Input, Radio } from "antd";

export const BidStepEditComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, onFinish } = useForm();

  const bidStepData = queryResult?.data?.data;
  const { radioGroupProps: bidStepCategoryRadioGroupProps } = useRadioGroup({
    resource: "bid_step_category",
    optionLabel: "name",
    defaultValue: bidStepData?.bid_step_category?.$id || undefined,
  });
  const handleOnFinish = (values: any) => {
    onFinish({
      ...values,
      bid_step_category: values.bid_step_category.$id,
    });
  };
  return (
    <Edit saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
      <Form
        {...formProps}
        layout="vertical"
        onFinish={handleOnFinish}
      //remove bid_step_category from form initial values
      >
        <h1>
          <strong>{bidStepData?.id}</strong>
        </h1>
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
          name={["bid_step_category", "$id"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueFromEvent={(e) => {
            return e.target.value;
          }}
        >
          <Radio.Group {...bidStepCategoryRadioGroupProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
