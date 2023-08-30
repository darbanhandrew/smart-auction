import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    TagField,
    EmailField,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from "dayjs";
export const UserProfileListComp: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });




    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="شناسه" />
                <Table.Column dataIndex="phone_number" title="Phone Number" />
                <Table.Column
                    dataIndex={["email"]}
                    title="Email"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column dataIndex={["user_id"]} title="کاربر" />
                <Table.Column
                    dataIndex={["$createdAt"]}
                    title="$created At"
                    render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD HH:MM:ss")}</></span>}
                />
                <Table.Column
                    dataIndex={["$updatedAt"]}
                    title="$updated At"
                    render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD HH:MM:ss")}</></span>}
                />


                <Table.Column
                    title="عملیات"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
