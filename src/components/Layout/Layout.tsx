import React, { ReactNode } from "react";
import "./Layout.module.scss";

import classes from "./Layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <div className={classes.Container}>{children}</div>;
};

export default Layout;
