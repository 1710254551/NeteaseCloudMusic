import React from "react";
import { Link } from "react-router-dom";
import xhr from "../utils/xhr";
//轮播按钮索引
function Carouselbtn(props) {
  const btnlist = props.list.map((item, index) => (
    <a
      className={props.num === index ? "active" : ""}
      hidefocus="true"
      href="/"
      onClick={(e) => props.callback(e, index)}
      key={index}
    >
      {" "}
    </a>
  ));
  return <div className="carouselbtn">{btnlist}</div>;
}

//轮播组件
function Carousel(props) {
  let num = props.num;
  if (!props.list.length) {
    return "";
  } else {
    return (
      <>
        <div
          className="backimage"
          style={{
            backgroundImage: "url(" + props.list[num].imageUrl + ")",
            backgroundSize: "6000px",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="banner-left-imgs">
          <a href={props.list[num].url} target="_blank" rel="noreferrer">
            <img src={props.list[num].imageUrl} alt="" />
          </a>
          <Carouselbtn
            list={props.list}
            callback={props.callback}
            num={props.num}
          />
        </div>
      </>
    );
  }
}

//录播主组件
class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [], num: 0, go: null };
  }
  componentDidMount() {
    xhr.post("http://localhost:3000/banner").then((res) => {
      this.setState({ list: res });
    });
    this.setState({ go: setInterval(() => this.tick(1), 2500) });
  }

  tick = (text) => {
    const len = this.state.list.banners.length;
    this.setState({
      num: (this.state.num + text) % len,
    });
  };
  onMouseOverHandle = (e) => {
    e.preventDefault();
    clearInterval(this.state.go);
  };
  onMouseLeaveHandle = (e) => {
    e.preventDefault();
    this.setState({ go: setInterval(() => this.tick(1), 2500) });
  };
  onclickHandle = (e, num) => {
    e.preventDefault();
    this.setState({ num });
  };
  preHandle = (e) => {
    e.preventDefault();
    this.tick(this.state.list.banners.length - 1);
  };
  nextHandle = (e) => {
    e.preventDefault();
    this.tick(1);
  };
  render() {
    let banners = this.state.list.banners || [];
    const num = this.state.num;
    return (
      <div
        className="banner"
        onMouseOver={this.onMouseOverHandle}
        onMouseLeave={this.onMouseLeaveHandle}
      >
        <div className="banner-content">
          <div className="banner-btnbox">
            <a href="#" className="prebtn" onClick={this.preHandle}>
              {" "}
            </a>
            <a href="#" className="nextbtn" onClick={this.nextHandle}>
              {" "}
            </a>
          </div>
          <div className="banner-left">
            <Carousel list={banners} num={num} callback={this.onclickHandle} />
          </div>
          <div className="banner-right">
            <Link to="/download"></Link>
            <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
