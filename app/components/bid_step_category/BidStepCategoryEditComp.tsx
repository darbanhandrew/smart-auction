import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

export const BidStepCategoryEditComp: React.FC<
  IResourceComponentsProps
> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const bidStepCategoryData = queryResult?.data?.data;

  const { selectProps: bidStepSelectProps } = useSelect({
    resource: "bid_step",
    optionLabel: "$id",
    optionValue: "$id",
    defaultValue: bidStepCategoryData?.bid_step,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <h1>
          <strong>{bidStepCategoryData?.id}</strong>
        </h1>
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
      </Form>
    </Edit>
  );
};
