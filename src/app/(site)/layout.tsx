"use client"
import { FC, ReactNode } from "react";
import scss from "./LayoutSite.module.scss";
import LayoutSite from "@/components/layout/LayoutSite";
interface ILayoutSiteProps {
    children: ReactNode
 
}
const layout: FC<ILayoutSiteProps> = ({children}) => {
  return (
     <LayoutSite>{children}</LayoutSite>
  );
};

export default layout;
