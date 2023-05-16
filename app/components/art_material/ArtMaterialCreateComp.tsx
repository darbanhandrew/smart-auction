import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input} from "antd";

export const ArtMaterialCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm();
  /* useSelect and populate artSelectProps */


  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
    </Create>
  );
};
