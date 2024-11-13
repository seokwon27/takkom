import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const DesktopLayout = ({ children, className }: PropsWithChildren & {className?: string}) => {
  return <div className={cn("max-sm:hidden")}>{children}</div>;
};

export default DesktopLayout;
