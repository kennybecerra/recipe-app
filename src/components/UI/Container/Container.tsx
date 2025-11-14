import type React from "react";
import type { ReactNode } from "react";

import classes from "./index.module.scss";

interface ContainerProps {
	children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
	return <div className={classes.Container}>{children}</div>;
};

export default Container;
