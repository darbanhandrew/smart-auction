import React, { useEffect } from "react";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { DatePicker } from "antd-jalali";
export const AuctionArtCreateComp: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: auctionSelectProps } = useSelect({
    resource: "auction",
    optionLabel: "name",
  });
  const [artOptions, setArtOptions] = React.useState<any[]>([]);
  const { data: artSelectQueryResult } = useList(

    {
      resource: "art",
    }
  )
  useEffect(() => {
    if (artSelectQueryResult?.data) {
      const artOptionsRequest = artSelectQueryResult?.data?.map((art: any) => ({
        label: `${art?.artist?.name ?? "Unknown Artist"} - ${art?.size ?? "Unknown Size"} - ${art?.art_material?.name ?? "Unknown Material"}`,
        value: art?.id,
      }));
      setArtOptions(artOptionsRequest);
    }
  }, [artSelectQueryResult?.data]);
  const { selectProps: bidStepCategoryProps } = useSelect({
    resource: "bid_step_category",
    optionLabel: "name",
  });
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Lot"
          name={["lot"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Auction Start Date"
          name={["auction_start_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
        <Form.Item
          label="Auction End Date"
          name={["auction_end_date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker
            showTime={{ format: 'HH:mm:ss' }}
          />
        </Form.Item>
        <Form.Item
          label="Min Price"
          name={["min_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Max Price"
          name={["max_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Current Price"
          name={["current_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Price"
          name={["start_price"]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="End Price"
          name={["end_price"]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Number of Bids"
          name={["number_of_bids"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          label="Order"
          name={["order"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Bid Step Category"
          name={["bid_step_category"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...bidStepCategoryProps} />
        </Form.Item>
        <Form.Item
          label="Auction"
          name={["auction"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...auctionSelectProps} />
        </Form.Item>
        {(artOptions.length > 0 &&
          <Form.Item
            label="Art"
            name={["art"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              // placeholder="نام آرتیست را تایپ کنید"
              // optionFilterProp="children"
              filterOption={(input, option) =>
                typeof option?.label === "string" && option.label.includes((input as string))
              }
              options={artOptions}
            >
              {artOptions?.map((option: {
                label: string,
                value: string
              }) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>)}
      </Form>
    </Create>
  );
};
