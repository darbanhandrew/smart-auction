import React from "react";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";

export const BidEditComp: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
    const bidData = queryResult?.data?.data;
    // const handleOnFinish = async (values: any) => {
    //   onFinish({
    //     ...values,
    //     user_id: values.user_profile
    //   });
    // }
    const { selectProps: auctionArtSelectProps } = useSelect({
        resource: "auction_art",
    });
    //useList and get all user profiles for select
    const { data: userProfiles } = useList({
        resource: "user_profile",
    });
    return (
        <Edit saveButtonProps={{
            ...saveButtonProps,
            children: "ذخیره",
        }}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Amount"
                    name={["amount"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
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
                        <Select.Option value="pending">در انتظار بررسی</Select.Option>
                        <Select.Option value="accepted">پذیرفته شده</Select.Option>
                        <Select.Option value="rejected">رد شده</Select.Option>
                    </Select>
                </Form.Item>
                <h1>
                    شماره لات اثر : <strong>{bidData?.auction_art?.lot}</strong><br />
                    نام حراج  : <strong>{bidData?.auction_art?.auction?.name}</strong><br />
                </h1>
                <Form.Item
                    label="کاربر"
                    name={["user_id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                //set select option value to user profile id if user profile.user_id == bid.user_id


                >
                    {/*crate select and options from userProfiles */}
                    <Select>
                        {userProfiles?.data?.map((userProfile: any) => (
                            <Select.Option value={userProfile.user_id}
                                key={userProfile.user_id}
                            >
                                {userProfile.first_name} {userProfile.last_name} - {userProfile.phone_number}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Edit>
    );
};
