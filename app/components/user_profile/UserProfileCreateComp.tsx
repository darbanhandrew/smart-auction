import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const UserProfileCreateComp: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    return (
        <Create saveButtonProps={{
            ...saveButtonProps,
            children: "ذخیره",
        }}
        title="ایجاد پروفایل کاربر"
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="شماره تلفن"
                    name={["phone_number"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="ایمیل"
                    name={["email"]}
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
