import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";
import { Link } from "@remix-run/react";
import { UploadImage } from "../upload_image/UploadImage";
import { UploadFile } from "antd/lib/upload";
import { storage } from "~/utility";
type User = {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    registration: string;
    status: boolean;
    passwordUpdate: string;
    email: string;
    phone: string;
    emailVerification: boolean;
    phoneVerification: boolean;
    prefs: {
        profile_id: string;
        code: string;
    };
};
export function UserProfileEditComp(data: any) {
    const { formProps, saveButtonProps, queryResult, onFinish } = useForm();
    const users = JSON.parse(data.data).users as User[];
    const userProfileData = queryResult?.data?.data;
    const [nationalIdImage, setNationalIdImage] = React.useState<UploadFile[]>([]);
    const handleOnFinish = async (values: any) => {
        onFinish({
            ...values,
            national_id_image: nationalIdImage.length > 0 ? nationalIdImage[0].uid : undefined,
        });
    };
    React.useEffect(() => {
        if (userProfileData && userProfileData.national_id_image) {
            setNationalIdImage([{
                uid: userProfileData.national_id_image,
                name: userProfileData.national_id_image,
                status: "done",
                url: storage
                    .getFilePreview("images", userProfileData.national_id_image, 500)
                    .toString(),
            }]);
        }
        else {
            setNationalIdImage([]);
        }
    }, [userProfileData]);
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
                <h1>
                    <Link to={`/user/edit/${userProfileData?.user_id}/`}>
                        <Button type="primary">ویرایش کاربر {userProfileData?.id} - {userProfileData?.phone_number}</Button>
                    </Link>
                </h1>

                <Form.Item
                    label="Phone Number"
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
                    label="Email"
                    name={["email"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name={["first_name"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last Name"
                    name={["last_name"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Sheba"
                    name={["sheba"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Country"
                    name={["country"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Province"
                    name={["province"]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="City"
                    name={["city"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name={["address"]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Postal Code"
                    name={["postal_code"]}
                >
                    <Input />
                </Form.Item>
                <h1>عکس کارت ملی</h1>
                <UploadImage
                    state={nationalIdImage}
                    setState={(state) => setNationalIdImage(state)}
                    name="national_id_image"
                    maxCount={1}
                    bucketId="national_card"
                />
                <Form.Item
                    label="Status"
                    name={["status"]}
                >
                    <Select>
                        <Select.Option value="accepted">تایید شده</Select.Option>
                        <Select.Option value="rejected">رد شده</Select.Option>
                        <Select.Option value="pending">در حال بررسی</Select.Option>
                        <Select.Option value="not_filled">تکمیل نشده</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Note"
                    name={["note"]}
                >
                    <Input />
                </Form.Item>




                {/*create a a button linked to edit user with */}

            </Form>
        </Edit>
    );
}
