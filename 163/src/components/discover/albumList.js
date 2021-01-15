//专辑栏目
function Albumlist(props) {
  const list1 = props.list.slice(0, 5).map((item, index) => (
    <li key={item.id}>
      <div className="cover">
        <img src={item.picUrl} title={item.name} />
        <a href="#" title={item.name} className="mak"></a>
        <a hreg="#" title="播放" className="icon-play-alpha"></a>
      </div>
      <p className="title">
        <a href="#">{item.name}</a>
      </p>
      <p className="singer">
        <a href="#">{item.artist.name}</a>
      </p>
    </li>
  ));
  const list2 = props.list.slice(5, 10).map((item, index) => (
    <li key={item.id}>
      <div className="cover">
        <img src={item.picUrl} title={item.name} />
        <a href="#" title={item.name} className="mak"></a>
        <a hreg="#" title="播放" className="icon-play-alpha"></a>
      </div>
      <p className="title">
        <a href="#">{item.name}</a>
      </p>
      <p className="singer">
        <a href="#">{item.artist.name}</a>
      </p>
    </li>
  ));
  return (
    <div className="discover-hot_disk">
      <div className="inner">
        <a href="javascript:void(0);" className="pre" onClick={props.prebtn} />
        <div className="roll">
          <ul
            style={
              props.num === 0
                ? { left: "0" }
                : props.mode === 1
                ? (props.num + 1) % 4 === 0
                  ? { left: "645px", transition: "none 0s ease 0s" }
                  : { left: "-645px" }
                : (props.num + 3) % 4 === 0
                ? { left: "-645px", transition: "none 0s ease 0s" }
                : { left: "645px" }
            }
          >
            {list2}
          </ul>
          <ul
            style={
              props.num === 1
                ? { left: "0" }
                : props.mode === 1
                ? (props.num + 1) % 4 === 1
                  ? { left: "645px", transition: "none 0s ease 0s" }
                  : { left: "-645px" }
                : (props.num + 3) % 4 === 1
                ? { left: "-645px", transition: "none 0s ease 0s" }
                : { left: "645px" }
            }
          >
            {list1}
          </ul>
          <ul
            style={
              props.num === 2
                ? { left: "0" }
                : props.mode === 1
                ? (props.num + 1) % 4 === 2
                  ? { left: "645px", transition: "none 0s ease 0s" }
                  : { left: "-645px" }
                : (props.num + 3) % 4 === 2
                ? { left: "-645px", transition: "none 0s ease 0s" }
                : { left: "645px" }
            }
          >
            {list2}
          </ul>
          <ul
            style={
              props.num === 3
                ? { left: "0" }
                : props.mode === 1
                ? (props.num + 1) % 4 === 3
                  ? { left: "645px", transition: "none 0s ease 0s" }
                  : { left: "-645px" }
                : (props.num + 3) % 4 === 3
                ? { left: "-645px", transition: "none 0s ease 0s" }
                : { left: "645px" }
            }
          >
            {list1}
          </ul>
        </div>
        <a
          href="javascript:void(0);"
          className="next"
          onClick={props.nextbtn}
        />
      </div>
    </div>
  );
}

export default Albumlist;
