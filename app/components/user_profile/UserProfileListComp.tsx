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
    getDefaultSortOrder
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from "dayjs";
export const UserProfileListComp: React.FC<IResourceComponentsProps> = () => {
    const { tableProps,sorter } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
              {
                field:"$createdAt",
                order:"desc"
              },
            ]
          }
    });




    return (
        <List
        createButtonProps={{
            children:"ایجاد پروفایل کاربر"
        }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="شناسه" />
                <Table.Column dataIndex="phone_number" title="شماره تلفن" />
                <Table.Column
                    dataIndex={["email"]}
                    title="ایمیل"
                    render={(value: any) => <EmailField value={value} />}
                />
                <Table.Column dataIndex={["user_id"]} title="کاربر" />
                <Table.Column
                dataIndex={["$createdAt"]}
                title="تاریخ ایحاد سند"
                sorter={{multiple:1}}
                defaultSortOrder={getDefaultSortOrder("$createdAt",sorter)}
                render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
                />
                <Table.Column
                dataIndex={["$updatedAt"]}
                title="آخرین تغییر"
                sorter={{multiple:3}}
                defaultSortOrder={getDefaultSortOrder("$updatedAt",sorter)}
                render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
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
