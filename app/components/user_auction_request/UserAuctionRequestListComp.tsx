import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import dayjs from 'dayjs';
export const UserAuctionRequestListComp: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column dataIndex="note" title="Note" />
                <Table.Column dataIndex={["user_id"]} title="User" />
                <Table.Column
                    dataIndex={["$createdAt"]}
                    title="$created At"
                    render={(value: Date) => {
                        return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
                    }}
                />
                <Table.Column
                    dataIndex={["$updatedAt"]}
                    title="$updated At"
                    render={(value: Date) => {
                        return dayjs(value).format('DD/MM/YYYY HH:mm:ss')
                    }}
                />

                <Table.Column dataIndex={["auction", "name"]} title="Auction" />

                <Table.Column
                    title="Actions"
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
