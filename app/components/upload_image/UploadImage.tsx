import React, { useState } from "react";
import { storage } from "~/utility";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadListType } from "antd/es/upload/interface";
import { ID } from "@refinedev/appwrite";
import { Upload, Button } from "antd";
//upload image props are :
//a state & setState from the parent component
//field name (string)
//make them typed
interface IUploadImageProps {
  state: UploadFile<any>[];
  setState: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
  name: string;
  multiple?: boolean;
  listType?: UploadListType;
  maxCount?: number;
}
export const UploadImage: React.FC<IUploadImageProps> = ({
  state,
  setState,
  name,
  multiple = false,
  listType = "picture",
  maxCount = 1,
}) => {
  const uploadFileAction = async (file: File) => {
    //generate a random id
    const randId = Math.random().toString(36).substring(2, 15);
    setState([
      ...state,
      {
        uid: randId,
        name: file.name,
        status: "uploading",
      },
    ]);
    const response = storage.createFile("images", ID.unique(), file);
    response
      .then((res) => {
        setState([
          ...state,
          {
            uid: res.$id,
            name: res.$id,
            status: "done",
            url: storage.getFilePreview("images", res.$id, 200).toString(),
          },
        ]);
      })
      .catch((err) => {
        //remove the file from the state
        setState(
          state.filter((file) => {
            return file.uid !== randId;
          })
        );
      });
    return (await response).$id;
  };
  return (
    <Upload.Dragger
      name={name}
      multiple={multiple}
      fileList={state}
      listType={listType}
      maxCount={maxCount}
      action={uploadFileAction}
      onRemove={(file: UploadFile<any>) => {
        if(file.status ==="done")
        storage.deleteFile("images", file.uid);
        setState(
          state.filter((f) => {
            return f.uid !== file.uid;
          })
        );
      }}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload.Dragger>
  );
};
