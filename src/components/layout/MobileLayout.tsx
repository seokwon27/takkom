import React, { PropsWithChildren } from "react";

const MobileLayout = ({ children }: PropsWithChildren) => {
  return <div className="sm:hidden">{children}</div>;
};

export default MobileLayout;
