import React, { useEffect } from "react";
import { IResourceComponentsProps, BaseRecord, useMany, useList } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
    getDefaultSortOrder
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from 'dayjs';
export const UserAuctionRequestListComp: React.FC<IResourceComponentsProps> = () => {
    const { tableProps, sorter } = useTable({
        syncWithLocation: true,
        sorters: {
            initial: [
                {
                    field: "$createdAt",
                    order: "desc"
                },
            ]
        }
    });
    const { data: userProfiles } = useList(
        {
            resource: "user_profile",
            pagination:
            {
                pageSize: 1000
            }
        }
    )
    useEffect(() => { }, [userProfiles])
    return (
        <List
            createButtonProps={{
                children: "ایجاد درخواست"
            }}
        >
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="شناسه" />
                <Table.Column dataIndex="status" title="وضعیت"
                    render={(value: string) => {
                        switch (value) {
                            case "pending":
                                return "در انتظار بررسی";
                            case "accepted":
                                return "تایید شده";
                            case "rejected":
                                return "رد شده";
                            default:
                                return "نامشخص";
                        }
                    }}
                    sorter={{ multiple: 4 }}
                    defaultSortOrder={getDefaultSortOrder("status", sorter)}
                />
                <Table.Column dataIndex="note" title="یادداشت" />
                <Table.Column dataIndex={["user_id"]} title="کاربر"
                    render={
                        (user_id) => {
                            if (userProfiles && userProfiles.data) {
                                const userProfile = userProfiles.data.find((userProfile: any) => userProfile.user_id == user_id);
                                if (userProfile) {
                                    return userProfile.first_name + userProfile.last_name;
                                }
                            }
                            return "در حال بارگذاری...";
                        }
                    }
                />
                <Table.Column
                    dataIndex={["$createdAt"]}
                    title="تاریخ ایحاد سند"
                    sorter={{ multiple: 1 }}
                    defaultSortOrder={getDefaultSortOrder("$createdAt", sorter)}
                    render={(value: Date) => {
                        return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
                    }}
                />
                <Table.Column
                    dataIndex={["$updatedAt"]}
                    title="آخرین تغییر"
                    sorter={{ multiple: 3 }}
                    defaultSortOrder={getDefaultSortOrder("$updatedAt", sorter)}
                    render={(value: Date) => {
                        return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
                    }}
                />

                <Table.Column dataIndex={["auction", "name"]} title="حراجی" />

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
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
