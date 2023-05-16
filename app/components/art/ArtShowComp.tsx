import React from "react";
import {
  IResourceComponentsProps,
  useMany,
  useOne,
  useShow,
} from "@refinedev/core";
import { Show, TagField, TextField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ArtShowComp: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const { data: artCategoryData, isLoading: artCategoryIsLoading } = useOne({
    resource: "art_category",
    id: data?.data?.art_category.$id || "",
  });
  const { data: artMaterialData, isLoading: artMaterialIsLoading } = useOne({
    resource: "art_material",
    id: data?.data?.art_material.$id || "",
  });
  const { data: artTechniqueData, isLoading: artTechniqueIsLoading } = useOne({
    resource: "art_technique",
    id: data?.data?.art_technique.$id || "",
  });
  const { data: artistData, isLoading: artistIsLoading } = useOne({
    resource: "artist",
    id: data?.data?.artist.$id || "",
  });
  const { data: auctionArtData, isLoading: auctionArtIsLoading } = useMany({
    resource: "auction_art",
    ids: data?.data?.auction_art.map((auctionArt: { $id: any; }) => auctionArt.$id) || [],
  });

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Size</Title>
      <TextField value={record?.size} />
      <Title level={5}>Date Of Artwork</Title>
      <DateField value={record?.date_of_artwork} />
      <Title level={5}>$created At</Title>
      <DateField value={record?.$createdAt} />
      <Title level={5}>$updated At</Title>
      <DateField value={record?.$updatedAt} />
      <Title level={5}>Art Category</Title>
      {artCategoryIsLoading ? (
        <>Loading...</>
      ) : (
        <>{artCategoryData?.data?.name}</>
      )}
      <Title level={5}>Art Material</Title>
      {artMaterialIsLoading ? (
        <>Loading...</>
      ) : (
        <>{artMaterialData?.data?.name}</>
      )}
      <Title level={5}>Art Technique</Title>
      {artTechniqueIsLoading ? (
        <>Loading...</>
      ) : (
        <>{artTechniqueData?.data?.name}</>
      )}
      <Title level={5}>Artist</Title>
      {artistIsLoading ? <>Loading...</> : <>{artistData?.data?.name}</>}
      <Title level={5}>Auction Arts</Title>
      {auctionArtIsLoading ? (
        <>Loading...</>
      ) : (
        <>
          {auctionArtData?.data?.map((auctionArt) => (
            <TagField key={auctionArt?.id} value={auctionArt?.lot} />
          ))}
        </>
      )}
    </Show>
  );
};
