import * as React from "react";

export const Row = (props) => {
  return (
    <div className={"row" + (props.className || "")} id={props.id}>
      {props.children}
    </div>
  );
};
