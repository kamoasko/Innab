import React from "react";
import { FaX } from "react-icons/fa6";
import ReactModal from "react-modal";

const Modal = ({
  isOpen,
  onClose,
  children,
  height,
  padding,
  contentLabel,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={contentLabel}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          zIndex: "9999",
        },
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2.4rem",
          flexDirection: "column",
          textAlign: "center",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          height: height,
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: padding,
          borderRadius: "2.4rem",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {children}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "10%",
          right: "5%",
          width: "1.5rem",
          height: "1.5rem",
        }}
      >
        <FaX style={{ width: "100%", height: "100%" }} />
      </button>
    </ReactModal>
  );
};

export default Modal;
