import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany, CrudFilters } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  getDefaultSortOrder,
} from "@refinedev/antd";
import dayjs from "dayjs";
import { Table, Space, Col, Row, Form, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
function isEmpty(str:string) {
  return (!str || str.length === 0 );
}
export const ArtistListComp: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter, searchFormProps,setFilters } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "$createdAt",
          order: "desc"
        },
      ]
    },
    onSearch: (params: { q: string }) => {
      const filters: CrudFilters = [];
      const { q } = params;
      console.log(q);
      if (isEmpty(q) || q === undefined) {
        setFilters([]); // Clear filters
        console.log(q);
        return filters;
      }
        filters.push(
          {
            field: "name",
            operator: "contains",
            value: q,
          }
        );
      return filters;
    },
  });

  return (
    <Col>
      <Form layout="vertical" {...searchFormProps}>
        <Form.Item label="نام و نام خانوادگی" name="q">
          <Input placeholder="نام و نام خانوادگی" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            جستجو
          </Button>
        </Form.Item>
      </Form>
      <List
        createButtonProps={{
          children: "ایجاد هنرمند"
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="شناسه" />
          <Table.Column dataIndex="name" title="نام و نام خانوادگی"
            sorter={{ multiple: 2 }}
            defaultSortOrder={getDefaultSortOrder("name", sorter)}
          />

          <Table.Column
            dataIndex="art"
            title="تعداد آثار"
            render={(value: any[]) =>
              //show count
              value?.length
            }
          />
          <Table.Column
            dataIndex={["$createdAt"]}
            title="تاریخ ایحاد سند"
            sorter={{ multiple: 1 }}
            defaultSortOrder={getDefaultSortOrder("$createdAt", sorter)}
            render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
          />
          <Table.Column
            dataIndex={["$updatedAt"]}
            title="آخرین تغییر"
            sorter={{ multiple: 3 }}
            defaultSortOrder={getDefaultSortOrder("$updatedAt", sorter)}
            render={(value: any) => <span><>{dayjs(value).format("YYYY/MM/DD")}</></span>}
          />
          <Table.Column
            title="عملیات"
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </Col>
  );
};
