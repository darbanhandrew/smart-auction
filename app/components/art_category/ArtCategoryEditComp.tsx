import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
export const ArtCategoryEditComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult, } = useForm();
  const artCategoryData = queryResult?.data?.data;
  return (
    <Edit saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}
    deleteButtonProps={{
      children:"حذف"
    }}
    title="ویرایش دسته بندی"
    >
      <Form {...formProps} layout="vertical">
        <h1>
          <strong>{artCategoryData?.id}</strong>
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
