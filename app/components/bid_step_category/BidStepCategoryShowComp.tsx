import React from "react";
import { IResourceComponentsProps, useShow, useMany } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const BidStepCategoryShowComp: React.FC<
  IResourceComponentsProps
> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: bidStepData, isLoading: bidStepIsLoading } = useMany({
    resource: "bid_step",
    ids: record?.bid_step.map((bidStep: { $id: any }) => bidStep.$id) || [],
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>$created At</Title>
      <DateField value={record?.$createdAt} />
      <Title level={5}>$updated At</Title>
      <DateField value={record?.$updatedAt} />
      <Title level={5}>Bid Step</Title>
      {bidStepIsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {bidStepData?.data?.map((bidStep) => (
            <TagField
              key={bidStep.id}
              value={`${bidStep.start_price}-${bidStep.end_price}-${bidStep.step_size}`}
            />
          ))}
        </>
      )}
    </Show>
  );
};
