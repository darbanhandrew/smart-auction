import React from "react";
import { List, Table, Button, Space, Row, Col } from "antd";
import { Link } from "@remix-run/react";
import { EditOutlined, DeleteOutlined, EyeOutlined, ProfileOutlined, PlusCircleOutlined } from '@ant-design/icons';
/*
    {
      '$id': '64783f832c4b142417ff',
      '$createdAt': '2023-06-01T06:49:39.182+00:00',
      '$updatedAt': '2023-06-01T07:02:46.739+00:00',
      name: 'Hamid Fadaei',
      password: '$argon2id$v=19$m=65536,t=4,p=3$Z0dMYS5qdmcxc0gzZzY3Tw$L+54NCwWfn11T7yFFsxB3236KGKG7CEC7l13612fxDk',
      hash: 'argon2',
      hashOptions: [Object],
      registration: '2023-06-01T06:49:39.181+00:00',
      status: true,
      passwordUpdate: '2023-06-01T06:49:39.181+00:00',
      email: '+989367381322@arthl.ir',
      phone: '',
      emailVerification: false,
      phoneVerification: true,
      prefs: [Object]
import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import dayjs from "dayjs";

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

    }<User>props) => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const userProfileData = queryResult?.?.data;

    return (
        <Edit       saveButtonProps={{
        ...saveButtonProps,
        children: "ذخیره",
      }}>
            <Form {...formProps} layout="vertical">
                <h1>
                    {userProfileData?.id} - {userProfileData?.phone_number}
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
            </Form>
        </Edit>
    );
};
generate columns based on data structure above */
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


// ...
const columns = [
  {
    title: "شناسه",
    dataIndex: "$id",
    key: "$id",
  },
  {
    title: "Phone Verification",
    dataIndex: "phoneVerification",
    key: "phoneVerification",
  },
  {
    title: "نام",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Action",
    key: 'action',
    render: (_: any, record: User) => (
      <Space>
        <Link to={`/user/edit/${record.$id}`}><Button type="primary" icon={<EditOutlined />}>Edit</Button></Link><Space />
        <Link to={`/user/delete/${record.$id}`}><Button type="primary" danger icon={<DeleteOutlined />}>Delete</Button></Link><Space />
        <Link to={`/user/show/${record.$id}`}><Button type="dashed" icon={<EyeOutlined />}>Show</Button></Link><Space />
        <Link to={`/user_profile/edit/${record.prefs.profile_id}`}><Button type="ghost" icon={<ProfileOutlined />}>Show Profile</Button></Link><Space />
      </Space>
    )
  }
];


export default function UserListComp(data: any) {



  //use loader data
  return (
    <List
      header={
        /*create a row where it has a header on the start and a button for create at the end*/
        <Row>
          <Col span={20}>
            <h1>
              Users
            </h1>
          </Col>
          <Col span={4}>
            <Space>
              <Link to="/user/create">
                <Button type="primary" icon={<PlusCircleOutlined />}>Create</Button>
              </Link>
            </Space>
          </Col>
        </Row>

      }
      bordered
    >
      <Table columns={columns} dataSource={
        data?.data
      } />
    </List>

  );
}
