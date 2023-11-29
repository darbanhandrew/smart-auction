import React, { useEffect, useState } from "react";
import { IResourceComponentsProps, BaseRecord, useMany, CrudFilters, useList, BaseKey } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DateField,
  getDefaultSortOrder,
} from "@refinedev/antd";
import dayjs from "dayjs";
import { Table, Space, Col, Row, Form, Input, Button, AutoComplete } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
// import { loader } from "~/routes/_layout.artist._index";
function isEmpty(str: string) {
  return (!str || str.length === 0);
}
interface Ioptions {
  label: any,
  value: BaseKey | undefined
}
export const ArtistListComp: React.FC<IResourceComponentsProps> = () => {
  // const initialArtists = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [artistValue, setArtistValue] = useState<string>("");
  const [options, setOptions] = useState<Ioptions[]>([]);
  const navigate = useNavigate();
  const { tableProps, sorter, searchFormProps, setFilters, filters } = useTable({
    syncWithLocation: false,
    sorters: {
      initial: [
        {
          field: "$createdAt",
          order: "desc"
        },
      ]
    },
  });
  const { refetch: refetchArtists } = useList(
    {
      resource: "artist",
      filters: [{ field: "name", operator: "contains", value: artistValue }],
      queryOptions: {
        // initialData:initialArtists,
        onSuccess: (data) => {
          const artistOptionGroup = data.data.map((item) => ({ label: item.name, value: item.name }));
          setOptions(artistOptionGroup);
        }
      }
    }
  )
  useEffect(() => {
    setOptions([]);
    refetchArtists();
  }, [artistValue]
  );
  return (
    <Col>
      <AutoComplete
        options={options}
        style={{ width: "100%", maxWidth: "550px" }}
        onSearch={(value: string) => setArtistValue(value)}
        filterOption={false}
        onSelect={(value: string) => {
          {
            console.log(filters);
            if (isEmpty(value) || value === undefined) {
              setFilters([],"replace");
              return
            }
            setFilters([
              {
                field: "name",
                operator: "eq",
                value: value,
              }],"replace"
            );
          }
        }
        }
        onClear={() => {
          setFilters([],"replace");
        }
        }
        clearIcon={<CloseOutlined />}
        allowClear={true}
      >
        <Input placeholder="نام و نام خانوادگی" prefix={<SearchOutlined />} />
      </AutoComplete>
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
