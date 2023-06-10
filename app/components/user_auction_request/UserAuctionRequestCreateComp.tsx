import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const UserAuctionRequestCreateComp: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const { selectProps: auctionSelectProps } = useSelect({
        resource: "auction",
        optionLabel: "name",
    });
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Status"
                    name={["status"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select>
                        <Select.Option value="pending">Pending</Select.Option>
                        <Select.Option value="accepted">Accepted</Select.Option>
                        <Select.Option value="rejected">Rejected</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Note"
                    name={["note"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="User"
                    name={"user_id"}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Auction"
                    name={["auction", "name"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...auctionSelectProps} />
                </Form.Item>
            </Form>
        </Create >
    );
};
