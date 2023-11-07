import { ID } from '@refinedev/appwrite';
import { Button, Form, Input } from 'antd';
import React from 'react';
import { functions } from '~/utility';
export default function UserCreateComp() {
    const handleOnFinish = async (values: any) => {
        const result = await functions.createExecution("userFunctions", JSON.stringify({
            type: "create",
            body: {
                //generate
                userId: ID.unique(),
                ...values
            }
        }));
    }

    return (
        <Form
            onFinish={handleOnFinish}
        >
            <Form.Item label="نام" name="name">
                <Input />
            </Form.Item>
            <Form.Item label="ایمیل" name="email">
                <Input />
            </Form.Item>
            <Form.Item label="شماره تلفن" name="phone">
                <Input />
            </Form.Item>
            <Form.Item label="رمز عبور" name="password">
                <Input />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">
                    ایجاد کاربر
                </Button>
            </Form.Item>
        </Form>
    )
}