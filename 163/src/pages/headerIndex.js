import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";
import React from "react";
import Banner from "../components/banner";
import Contain from "../components/contain";
import Discover from "./discover";
import Footer from "../components/footer";
import Popuplogin from "../components/popuplogin";
import xhr from "../utils/xhr";
//头部一般按钮
function Nomarl(props) {
  const lis = (
    <li>
      <span>
        <NavLink exact to={props.list.path}>
          <em>{props.list.title}</em>
          <sub></sub>
        </NavLink>
      </span>
    </li>
  );
  return lis;
}
//头部会跳转页面的按钮
function Blank(props) {
  const lis = (
    <li>
      <span>
        <Link to={props.list.path} target="_blank">
          <em>{props.list.title}</em>
        </Link>
      </span>
    </li>
  );
  return lis;
}
//头部热门按钮
function Hot(props) {
  const lis = (
    <li>
      <span className="hot">
        <Link to={props.list.path}>
          <em>{props.list.title}</em>
          <sub></sub>
        </Link>
      </span>
    </li>
  );
  return lis;
}
//头部按钮
function TopListUl(props) {
  const lis = props.list.map((item) => {
    if (!item.blank) {
      return <Nomarl list={item} key={item.title.toString()} />;
    } else {
      if (item.hot) {
        return <Hot list={item} key={item.title.toString()} />;
      } else {
        return <Blank list={item} key={item.title.toString()} />;
      }
    }
  });
  return <ul className="header-top-navs-list">{lis}</ul>;
}
//头部按钮列表数据
function TopList() {
  const list = [
    { title: "发现音乐", path: "/" },
    { title: "我的音乐", path: "/my" },
    { title: "朋友", path: "/friend" },
    { title: "商城", path: "/store/product", blank: true },
    { title: "音乐人", path: "/st/musician", blank: true },
    { title: "下载客户端", path: "/download", hot: true },
  ];

  return <TopListUl list={list} />;
}
//头部整体
function Header(props) {
  const avatarUrl = props.data.profile
    ? props.data.profile.avatarUrl + "?param=30y30"
    : "";
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-top-navs">
          <h1 className="header-top-navs-logo"> </h1>
          <TopList />
          <div className="search">
            <input placeholder="音乐/视频/电台/用户" />
          </div>
          <Link to="/#" className="CreatorCenter">
            创作者中心
          </Link>
          <div
            className="loginbox"
            style={
              props.code === 803 ? { display: "none" } : { display: "flex" }
            }
          >
            <Link to="/#" className="loginbtn" onClick={props.click}>
              登录
            </Link>
          </div>
          <div
            className="user-head"
            style={
              props.code === 803 ? { display: "flex" } : { display: "none" }
            }
          >
            <img alt="头像" src={avatarUrl} />
            <ul className="btnlist"></ul>
          </div>
        </div>
      </div>
    </div>
  );
}

//头部下方红条内容
function Headersubnav(props) {
  return (
    <div className="header-subnav">
      <div className="header-subnav-navs">{props.children}</div>
    </div>
  );
}

//头部下方红条路由
function Headersubnavroute(props) {
  return (
    <Router basename="/#/discover">
      <Headersubnav>
        <ul>
          <li>
            <NavLink exact to="/">
              <em>推荐</em>
            </NavLink>
          </li>
          <li>
            <NavLink to="/toplist">
              <em>排行榜</em>
            </NavLink>
          </li>
          <li>
            <NavLink to="/playlist">
              <em>歌单</em>
            </NavLink>
          </li>
          <li>
            <NavLink to="/djradio">
              <em>主播电台</em>
            </NavLink>
          </li>
          <li>
            <NavLink to="/artist">
              <em>歌手</em>
            </NavLink>
          </li>
          <li>
            <NavLink to="/album">
              <em>新碟上架</em>
            </NavLink>
          </li>
        </ul>
      </Headersubnav>
      <Switch>
        <Route exact path="/">
          <Banner></Banner>
          <Contain>
            <Discover click={props.click} code={props.code} data={props.data} />
          </Contain>
        </Route>
        <Route path="/toplist">
          <Contain>排行榜</Contain>
        </Route>
        <Route path="/playlist">
          <Contain>歌单</Contain>
        </Route>
        <Route path="/djradio">
          <Contain>主播电台</Contain>
        </Route>
        <Route path="/artist">
          <Contain>歌手</Contain>
        </Route>
        <Route path="/album">
          <Contain>专辑</Contain>
        </Route>
      </Switch>
    </Router>
  );
}

//头部主内容
class Main extends React.Component {
  constructor(prpos) {
    super(prpos);
    this.state = {
      opened: false,
      qrkey: "",
      qrimg: "",
      setTime: null,
      isScan: 0,
      Date: Date.now(),
      userdata: {
        code: 200,
        account: null,
        profile: null,
      },
    };
  }

  qrkey = (e) => {
    e ? e.preventDefault() : (e = 0);
    xhr.post("http://localhost:3000/login/qr/key").then((res) => {
      this.setState({ qrkey: res.data.unikey });
      e ? this.login(e) : (e = 0);
      xhr
        .post(
          "http://localhost:3000/login/qr/create?qrimg=true&key=" +
            res.data.unikey
        )
        .then((res) => {
          this.setState({ qrimg: res.data.qrimg });
        });
    });
  };
  componentDidMount() {
    this.qrkey();
  }
  login = (e) => {
    e ? e.preventDefault() : (e = 0);

    this.setState({
      opened: true,
      setTime: setInterval(() => {
        xhr
          .post(
            "http://localhost:3000/login/qr/check?key=" +
              this.state.qrkey +
              "&timerstamp=" +
              new Date().getTime()
          )
          .then((res) => {
            let code = res ? res.code : 800;
            this.setState({ isScan: code });
            console.log(this.state.isScan);
            if (this.state.isScan === 800) clearInterval(this.state.setTime);
            if (this.state.isScan === 803) {
              console.log(res);
              xhr
                .post(
                  "http://localhost:3000/login/status?" +
                    "timerstamp=" +
                    new Date().getTime()
                )
                .then((res) => {
                  console.log(res);
                  this.setState({ userdata: res.data });
                });
              this.loginClose();
            }
          });
      }, 1000),
    });

    window.onscroll = function () {
      this.scrollTo(0, 0);
    };
  };
  loginClose = () => {
    clearInterval(this.state.setTime);
    this.setState({ opened: false });
    window.onscroll = null;
  };
  render() {
    return (
      <>
        <Router>
          <Header
            click={this.login}
            code={this.state.isScan}
            data={this.state.userdata}
          />
          <Switch>
            <Route exact path="/">
              <Headersubnavroute
                click={this.login}
                code={this.state.isScan}
                data={this.state.userdata}
              />
            </Route>
            <Route path="/my">
              <Headersubnav />
              <Contain>我的信息</Contain>
            </Route>
            <Route path="/friend">
              <Headersubnav />
              <Contain>朋友</Contain>
            </Route>
            <Route path="/download">
              <Headersubnav />
              <div>下载客户端</div>
            </Route>
          </Switch>
        </Router>
        <Footer />
        <Popuplogin
          opened={this.state.opened}
          close={this.loginClose}
          qrimg={this.state.qrimg}
          logincode={this.state.isScan}
          refresh={this.qrkey}
        />
      </>
    );
  }
}

function HeaderIndex() {
  return <Main />;
}

export default HeaderIndex;
