import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const ArtTechniqueCreateComp: React.FC<
  IResourceComponentsProps
> = () => {
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
