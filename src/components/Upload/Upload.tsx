import { Upload as AntUpload, App } from "antd";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { randomId } from "utils";
import type { RcFile, UploadProps } from "antd/es/upload/interface";
import classNames from "classnames";
import IFile from "interfaces/IFile";
import React from "react";

interface IUploadProps extends UploadProps {
  moreclass?: string;
  maxSize?: number;
  ref?: React.RefObject<unknown>;
  onStartUpload?: () => void;
  onEndUpload?: (data?: IFile) => void;
}

const Upload: React.FC<IUploadProps> = ({
  disabled,
  accept = "image/*",
  showUploadList,
  moreclass = "",
  maxSize = 10,
  onStartUpload,
  onEndUpload,
  children,
  ...props
}) => {
  const { message } = App.useApp();

  const handleBeforeUpload = (file: RcFile) => {
    const isLt2M = file.size / 1024 / 1024 < maxSize;
    if (!isLt2M) {
      message.error(`File must smaller than ${maxSize}MB!`);
    }
    return isLt2M;
  };

  const handleUpload = async (options: UploadRequestOption) => {
    try {
      const { file } = options;

      const formData = new FormData();

      formData.append("file", file);

      if (onStartUpload) onStartUpload();

      const data: IFile = {
        fileId: randomId(),
        fileUrl: URL.createObjectURL(file as Blob),
      };

      message.success("Upload file successfully!");

      if (onEndUpload) onEndUpload(data);
    } catch (error) {
      if (onEndUpload) onEndUpload();
      message.error("Upload file error!");
      console.log(error);
    }
  };

  return (
    <AntUpload
      accept={accept}
      className={classNames("custom-upload-v2", moreclass)}
      showUploadList={showUploadList}
      beforeUpload={handleBeforeUpload}
      disabled={disabled}
      customRequest={handleUpload}
      {...props}
    >
      {children}
    </AntUpload>
  );
};

export default Upload;
