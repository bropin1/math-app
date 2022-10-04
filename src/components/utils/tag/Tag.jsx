import React, { Fragment } from "react";
import style from "./Tag.module.scss";

const Tag = (props) => {
  return (
    <Fragment>
      <div className={style.tag}>
        <span>{props.name}</span>
      </div>
    </Fragment>
  );
};

export default Tag;
