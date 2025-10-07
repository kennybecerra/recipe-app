import React, { ReactNode } from "react";

interface AuxilaryProps {
  children: ReactNode;
}

const Auxilary: React.FC<AuxilaryProps> = ({ children }) => {
  return <>{children}</>;
};

export default Auxilary;
