import * as React from "react";

export const Cell = (props) => {
  return <div className={"cell" + (props.className || "")} id={props.id} />;
};
