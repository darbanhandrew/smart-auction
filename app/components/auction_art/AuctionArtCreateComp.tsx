import React, { useEffect } from "react";
import { IResourceComponentsProps, useList } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, InputNumber } from "antd";
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
        label: `${art?.artist?.name ?? "نامشخص هنرمند"} - ${art?.size ?? "نامشخص سایز"} - ${art?.art_material?.name ?? "نامشخص Material"}`,
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
    <Create saveButtonProps={{
      ...saveButtonProps,
      children: "ذخیره",
    }}>
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

        {(artOptions.length > 0 &&
          <Form.Item
            label="اثر"
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
        <Form.Item
          label="حراج"
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
          label=" تاریخ شروع"
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
          label=" تاریخ پایان"
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
          label="کمینه قیمت"
          name={["min_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter="ریال"
          />
        </Form.Item>
        <Form.Item
          label="بیشینه قیمت"
          name={["max_price"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter="ریال"
          />
        </Form.Item>
        <Form.Item
          label="قیمت شروع"
          name={["start_price"]}
        >
          <InputNumber
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter="ریال"
          />
        </Form.Item>
        <Form.Item
          label="قیمت نهایی"
          name={["end_price"]}
        >
          <InputNumber
            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%' }}
            addonAfter="ریال"
          />
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
          label="قدم های بید"
          name={["bid_step_category"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...bidStepCategoryProps} />
        </Form.Item>

      </Form>
    </Create>
  );
};
