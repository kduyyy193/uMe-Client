import { Modal as ModalAnt, ModalProps } from "antd";
import React, { JSXElementConstructor, ReactElement } from "react";

type ModalConfirmTypeProps = {
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactElement<any, string | JSXElementConstructor<any>>;
} & ModalProps;

const Modal = ({ children }: ModalConfirmTypeProps) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

const Approve = (props: ModalConfirmTypeProps) => {
  const { onConfirm, onCancel } = props;
  return (
    <ModalAnt
      {...props}
      centered
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Approve"
      okButtonProps={{
        className: "!bg-green-500 !text-white",
      }}
      title={<p className="font-medium text-base">Are you sure you want to approve?</p>}
      closable={false}
    ></ModalAnt>
  );
};

const Reject = (props: ModalConfirmTypeProps) => {
  const { onConfirm, onCancel } = props;
  return (
    <ModalAnt
      {...props}
      centered
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Reject"
      okButtonProps={{
        className: "!bg-red-500!text-white",
      }}
      title={<p className="font-medium text-base">Are you sure you want to reject?</p>}
      closable={false}
    ></ModalAnt>
  );
};

const Delete = (props: ModalConfirmTypeProps) => {
  const { onConfirm, onCancel } = props;
  return (
    <ModalAnt
      {...props}
      centered
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Delete"
      okButtonProps={{
        className: "!bg-red-500 !text-white",
      }}
      title={<p className="font-medium text-base">Bạn chắc chắn muốn xoá?</p>}
      closable={false}
    ></ModalAnt>
  );
};

Modal.Approve = Approve;
Modal.Reject = Reject;
Modal.Delete = Delete;

export default Modal;
