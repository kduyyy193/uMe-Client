import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState("");

  const handleOpen = (modalName: string) => {
    setOpen(modalName);
  };

  const handleClose = () => {
    setOpen("");
  };

  return {
    open,
    handleOpen,
    handleClose,
  };
};

export default useModal;
