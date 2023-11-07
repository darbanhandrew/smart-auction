import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const ArtTechniqueEditComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const artTechniqueData = queryResult?.data?.data;
  return (
    <Edit saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}
    deleteButtonProps={{
      children:"حذف"
    }}
    title="ویرایش تکنیک"
    >
      <Form {...formProps} layout="vertical">
        <h1>
          <strong>{artTechniqueData?.id}</strong>
        </h1>
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
    </Edit>
  );
};
