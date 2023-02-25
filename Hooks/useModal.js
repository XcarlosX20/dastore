import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
const useModal = () => {
  const styleModalBasic = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const ModalComponent = (props) => {
    return (
      <Modal {...props}>
        <Box sx={{ ...styleModalBasic, ...props?.styles }}>
          {props.children}
        </Box>
      </Modal>
    );
  };
  return { handleOpen, handleClose, ModalComponent, isOpen };
};

export default useModal;
