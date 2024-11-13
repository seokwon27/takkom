import React, { PropsWithChildren } from "react";

const DesktopLayout = ({ children }: PropsWithChildren) => {
  return <div className="max-sm:hidden">{children}</div>;
};

export default DesktopLayout;
