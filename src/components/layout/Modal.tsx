import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, position }: { children: ReactNode; position: HTMLElement }) => {
  return createPortal(
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-gray-900/50 z-50 pointer-active-auto">{children}</div>,
    position
  );
};

export default Modal;
