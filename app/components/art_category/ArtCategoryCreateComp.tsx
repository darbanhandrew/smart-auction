import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
export const ArtCategoryCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  return (
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
      <Form {...formProps} layout="vertical">
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
      </Form>
    </Create>
  );
};
