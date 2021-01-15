//歌单栏目
function Playlist(props) {
  const list = props.list.map((item, index) => (
    <li key={item.id}>
      <div className="pl-cover">
        <img src={item.picUrl} />
        <a className="mak" href="#" title={item.name} />
        <div className="bottom">
          <span className="icon-headset"></span>
          <span className="numb">{props.numberChange(item.playCount)}</span>
          <a href="#" className="icon-play" title="播放" />
        </div>
      </div>

      <p className="text">
        <a href="#" title={item.name}>
          {item.name}
        </a>
      </p>
    </li>
  ));
  return <ul className="discover-hot_playlist">{list}</ul>;
}

export default Playlist;
