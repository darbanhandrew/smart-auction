import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
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

  const { selectProps: artSelectProps } = useSelect({
    resource: "art",
    optionLabel: "name",
  });

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
          showTime={{ format:'HH:mm:ss'}}
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
          showTime={{ format:'HH:mm:ss'}}
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
        <Form.Item
          label="Art"
          name={["art"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...artSelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
