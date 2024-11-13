import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

const MobileLayout = ({ children, className }: PropsWithChildren & {className?: string}) => {
  return <div className={cn("sm:hidden", className)}>{children}</div>;
};

export default MobileLayout;
