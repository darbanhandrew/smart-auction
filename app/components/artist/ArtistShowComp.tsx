import React from "react";
import { IResourceComponentsProps, useMany, useShow } from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ArtistShowComp: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const { data: artData, isLoading: artIsLoading } = useMany({
    resource: "art",
    ids: data?.data?.art.map((art: any) => art.$id),
  });

  const record = data?.data;

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
      <Title level={5}>Art</Title>
      {artIsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {artData?.data?.map((art: any) => (
            <TagField key={art.id} value={art.name} />
          ))}
        </>
      )}
    </Show>
  );
};
