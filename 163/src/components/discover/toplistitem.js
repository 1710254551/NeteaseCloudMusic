function Toplistitem(props) {
  const list = props.list.map((item, index) => (
    <li key={index}>
      <span className={index + 1 <= 3 ? "rank ontop" : "rank"}>
        {index + 1}
      </span>
      <a href="JavaScript:;">{item.name}</a>
      <div className="oper">
        <a title="播放" href="JavaScript:viod(0);" className="icon-play"></a>
        <a
          title="添加到播放列表"
          href="JavaScript:viod(0);"
          className="icon-add"
        ></a>
        <a
          title="收藏"
          href="JavaScript:viod(0);"
          className="icon-collection"
        ></a>
      </div>
    </li>
  ));
  return (
    <dl className="blk">
      <dt className="top">
        <div className="cover">
          <img src={props.topimgurl.coverImgUrl} alt="" />
          <a
            href="JavaScript:viod(0);"
            className="msk"
            title={props.topimgurl.name}
          ></a>
        </div>
        <div className="tit">
          <a href="JavaScript:viod(0);">{props.topimgurl.name}</a>
          <div className="btn">
            <a
              href="JavaScript:viod(0);"
              className="icon-play"
              title="播放"
            ></a>
            <a
              href="JavaScript:viod(0);"
              className="icon-collection"
              title="收藏"
            ></a>
          </div>
        </div>
      </dt>
      <dd>
        <ol>{list}</ol>
        <div className="more">
          <a href="/#/discover/toplist">查看全部&gt;</a>
        </div>
      </dd>
    </dl>
  );
}

export default Toplistitem;
