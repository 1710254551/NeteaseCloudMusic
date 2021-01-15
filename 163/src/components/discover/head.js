import React from "react";
//栏目统一头部
function Head(props) {
  if (props.list) {
    const list = props.list.map((item, index) => (
      <React.Fragment key={item.position}>
        <a href="/#/discover/playlist">{item.name}</a>
        <span className="line">|</span>
      </React.Fragment>
    ));

    return (
      <div className="discover-hot-left_head">
        <a className="title" href={props.path}>
          {props.title}
        </a>
        <div className="tab">{list}</div>
        <span className="more">
          <a href={props.path}>更多</a>
          <i></i>
        </span>
      </div>
    );
  } else {
    return (
      <div className="discover-hot-left_head">
        <a className="title" href={props.path}>
          {props.title}
        </a>
        <span className="more">
          <a href={props.path}>更多</a>
          <i></i>
        </span>
      </div>
    );
  }
}

export default Head;
