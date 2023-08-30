import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { User } from "~/utility/UserType";

export function UserAuctionRequestCreateComp(data: any) {
    const { formProps, saveButtonProps, queryResult } = useForm();
    const users = JSON.parse(data.data).users as User[];
    const { selectProps: auctionSelectProps } = useSelect({
        resource: "auction",
        optionLabel: "name",
    });
    return (
        <Create saveButtonProps={{
            ...saveButtonProps,
            children: "ذخیره",
        }}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="وضعیت"
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
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="User"
                    name={["user_id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch
                    >
                        {users.map((user) => (
                            <Select.Option key={user.$id} value={user.$id}>{`${user.name}-${user.phone}`}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="نام معرف"
                    name={["referee_name"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="شماره تلفن معرف"
                    name={["referee_phone"]}
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
        </Create>
    );
}
