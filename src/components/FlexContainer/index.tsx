import React from "react";

interface IProps {
  children: React.ReactNode;
  display?: "flex";
  justifyContent?: string;
  alignItems?: string;
}

const FlexContainer = ({
  children,
  display = "flex",
  justifyContent = "space-between",
  alignItems = "center"
}: IProps) => {
  return <div style={{ display, justifyContent, alignItems }}>{children}</div>;
};

export default FlexContainer;
