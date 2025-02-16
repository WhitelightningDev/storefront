import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastService = ({ message, show, onClose, bg = "success" }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={2000} autohide bg={bg}>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastService;
