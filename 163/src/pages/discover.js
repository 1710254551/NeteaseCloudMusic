import React from "react";
import xhr from "../utils/xhr";
import Albumlist from "../components/discover/albumList";
import Head from "../components/discover/head";
import Playlist from "../components/discover/playList";
import Toplistitem from "../components/discover/toplistitem";

function Anchor(props) {
  if (!props.list) {
    return "";
  } else {
    return (
      <li>
        <a href="#" className="anchor-cover">
          <img className="img" src={props.list.avatarUrl} />
        </a>
        <div className="ifo">
          <p>
            <a href="#" className="name">
              {props.list.nickname}
            </a>
          </p>
          <p className="text">{props.list.description}</p>
        </div>
      </li>
    );
  }
}

function Singer(props) {
  // console.log(props.list);
  if (!props.list) {
    return "";
  } else {
    return (
      <li>
        <a href="#" className="item">
          <div className="head">
            <img className="img" src={props.list.avatarUrl} />
          </div>
          <div className="ifo">
            <h4>
              <span className="name">{props.list.nickname}</span>
            </h4>
            <p className="text">{props.list.description}</p>
          </div>
        </a>
      </li>
    );
  }
}

function Toplist(props) {
  if (!props.list.topimgurl.length) {
    return "";
  } else {
    return (
      <div className="discover-hot-left_toplist">
        <Toplistitem
          list={props.list.soarlist}
          topimgurl={props.list.topimgurl[0]}
        />
        <Toplistitem
          list={props.list.newlist}
          topimgurl={props.list.topimgurl[1]}
        />
        <Toplistitem
          list={props.list.origlist}
          topimgurl={props.list.topimgurl[2]}
        />
      </div>
    );
  }
}

class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumnum: 1,
      albummode: 0,
    };
  }
  componentDidMount() {
    xhr
      .post("http://localhost:3000/playlist/hot")
      .then((res) => this.setState({ headlist: res.tags.slice(0, 5) }));
    xhr
      .post("http://localhost:3000/personalized?limit=8")
      .then((res) => this.setState({ playlist: res.result }));

    xhr
      .post("http://localhost:3000/album/newest")
      .then((res) => this.setState({ albumlist: res.albums.slice(0, 10) }));
    xhr
      .post("http://localhost:3000/toplist")
      .then((res) => this.setState({ topimgurl: res.list.slice(0, 3) }));
    xhr
      .post("http://localhost:3000/playlist/detail?id=19723756")
      .then((res) =>
        this.setState({ soarlist: res.playlist.tracks.slice(0, 10) })
      );
    xhr
      .post("http://localhost:3000/playlist/detail?id=3779629")
      .then((res) =>
        this.setState({ newlist: res.playlist.tracks.slice(0, 10) })
      );
    xhr
      .post("http://localhost:3000/playlist/detail?id=2884035")
      .then((res) =>
        this.setState({ origlist: res.playlist.tracks.slice(0, 10) })
      );

    xhr.post("http://localhost:3000/user/detail?uid=29879272").then((res) =>
      this.setState({
        singerlist1: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=100167517").then((res) =>
      this.setState({
        singerlist2: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=58426904").then((res) =>
      this.setState({
        singerlist3: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=93504818").then((res) =>
      this.setState({
        singerlist4: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=46998208").then((res) =>
      this.setState({
        singerlist5: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=278438485").then((res) =>
      this.setState({
        anchorlist1: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=91239965").then((res) =>
      this.setState({
        anchorlist2: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=324314596").then((res) =>
      this.setState({
        anchorlist3: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=1611157").then((res) =>
      this.setState({
        anchorlist4: res.profile,
      })
    );
    xhr.post("http://localhost:3000/user/detail?uid=2313954").then((res) =>
      this.setState({
        anchorlist5: res.profile,
      })
    );
  }
  numberChange = (num) => {
    if (num >= 10000) {
      return Math.floor(num / 10000) + "万";
    } else {
      return num;
    }
  };

  prebtn = (e) => {
    e.preventDefault();
    this.setState({ albumnum: (this.state.albumnum + 3) % 4, albummode: 0 });
  };
  nextbtn = (e) => {
    e.preventDefault();
    this.setState({ albumnum: (this.state.albumnum + 1) % 4, albummode: 1 });
  };

  render() {
    // console.log(this.props);
    const headlist = this.state.headlist || [];
    const playlist = this.state.playlist || [];
    const albumlist = this.state.albumlist || [];
    const albumnum = this.state.albumnum;
    const albummode = this.state.albummode;
    const newlist = this.state.newlist || [];
    const origlist = this.state.origlist || [];
    const topimgurl = this.state.topimgurl || [];
    const soarlist = this.state.soarlist || [];
    const toplist = { newlist, origlist, topimgurl, soarlist };
    const avatarUrl = this.props.data.profile
      ? this.props.data.profile.avatarUrl + "?param=80y80"
      : "";
    const nickname = this.props.data.profile
      ? this.props.data.profile.nickname
      : "";
    const accountType = this.props.data.profile
      ? this.props.data.profile.accountType
      : 0;
    const accountStatus = this.props.data.profile
      ? this.props.data.profile.accountStatus
      : 0;
    const authStatus = this.props.data.profile
      ? this.props.data.profile.authStatus
      : 0;
    const viptype = this.props.data.profile
      ? this.props.data.profile.vipType
      : 0;
    return (
      <div className="discover-hot">
        <div className="discover-hot-left">
          <Head title="热门推荐" path="/#/discover/playlist/" list={headlist} />

          <Playlist list={playlist} numberChange={this.numberChange} />
          <div style={{ position: "relative", margin: "0 0 33px" }}></div>
          <Head title="新碟上架" path="/#/discover/album/" />
          <Albumlist
            list={albumlist}
            nextbtn={this.nextbtn}
            prebtn={this.prebtn}
            num={albumnum}
            mode={albummode}
          />
          <Head title="榜单" path="/#/discover/toplist" />
          <Toplist list={toplist} />
        </div>
        <div className="discover-hot-right">
          <div
            className="loging"
            style={
              this.props.code === 803
                ? { backgroundPosition: "0 -270px" }
                : { backgroundPosition: "0 0" }
            }
          >
            <div
              className="inner"
              style={
                this.props.code === 803
                  ? { display: "none" }
                  : { display: "block" }
              }
            >
              <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
              <a href="JavaScript:;" onClick={(e) => this.props.click(e)}>
                用户登录
              </a>
            </div>
            <div
              className="signed-inner"
              style={
                this.props.code === 803
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div className="avatar">
                <a href="#" className="img">
                  <img src={avatarUrl} alt="" />
                </a>
                <div className="info">
                  <h4 className="name">
                    <a href="#">{nickname}</a>
                    <span className={viptype === 11 ? "vip" : "novip"}></span>
                  </h4>
                  <p className="level">
                    <a>
                      {accountType}
                      <i></i>
                    </a>
                  </p>
                  <div className="sign">
                    <a>
                      <i>签到</i>
                    </a>
                  </div>
                </div>
              </div>
              <ul className="nums">
                <li>
                  <a href="JavaScript:;">
                    <strong>{accountStatus}</strong>
                    <span>动态</span>
                  </a>
                </li>
                <li>
                  <a href="JavaScript:;">
                    <strong>{accountType}</strong>
                    <span>关注</span>
                  </a>
                </li>
                <li>
                  <a href="JavaScript:;">
                    <strong>{authStatus}</strong>
                    <span>粉丝</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="singer">
            <div className="more">
              <span>入驻歌手</span>
              <a href="/#/discover/artist">查看全部 &gt;</a>
            </div>
            <ul className="singer-user-list">
              <Singer list={this.state.singerlist1} />
              <Singer list={this.state.singerlist2} />
              <Singer list={this.state.singerlist3} />
              <Singer list={this.state.singerlist4} />
              <Singer list={this.state.singerlist5} />
            </ul>
            <div className="btn">
              <a href="/st/musician">
                <i>申请成为网易音乐人</i>
              </a>
            </div>
          </div>

          <div className="hot-anchor">
            <div className="head-h3">热门主播</div>
            <ul className="hot-anchor-list">
              <Anchor list={this.state.anchorlist1} />
              <Anchor list={this.state.anchorlist2} />
              <Anchor list={this.state.anchorlist3} />
              <Anchor list={this.state.anchorlist4} />
              <Anchor list={this.state.anchorlist5} />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Discover;
