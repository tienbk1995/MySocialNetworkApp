import React, { Fragment } from "react";
import spinner from "./ball.gif";

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "50px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);
export default Spinner;
