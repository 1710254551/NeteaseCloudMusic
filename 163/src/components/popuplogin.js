import React from "react";
class Popuplogin extends React.Component {
  onmove = (e) => {
    e.preventDefault();
    const login = document.getElementsByClassName("user-login")[0];
    var diffX = 0;
    var diffY = 0;

    diffX = e.clientX - login.offsetLeft;
    diffY = e.clientY - login.offsetTop;

    document.onmousemove = function (e) {
      e.preventDefault();
      var moveX = e.clientX - diffX;
      var moveY = e.clientY - diffY;
      console.log(diffX, diffY);
      if (moveX < 0) {
        moveX = 0;
      } else if (moveX > window.innerWidth - login.offsetWidth) {
        moveX = window.innerWidth - login.offsetWidth;
      }
      if (moveY < 0) {
        moveY = 0;
      } else if (moveY > window.innerHeight - login.offsetHeight) {
        moveY = window.innerHeight - login.offsetHeight;
      }
      login.style.left = moveX + "px";
      login.style.top = moveY + "px";
    };
    document.onmouseup = function (e) {
      e.preventDefault();
      this.onmousemove = null;
      this.onmouseup = null;
    };
  };
  render() {
    return (
      <div
        style={this.props.opened ? { display: "block" } : { display: "none" }}
      >
        <div className="login-bg"></div>
        <div className="user-login">
          <div className="head" onMouseDown={(e) => this.onmove(e)}>
            <div className="login">登录</div>
          </div>
          <div className="ways">
            <div className="main">
              <div className="login-list"></div>
              <div className="login-phone">
                <div className="inner">
                  <div
                    className="main-view"
                    style={
                      this.props.logincode === 802
                        ? { display: "none" }
                        : { display: "flex" }
                    }
                  >
                    <div className="phone"></div>
                    <div className="right">
                      <div className="title">扫码登录</div>
                      <div className="qr">
                        <div
                          className="timeout"
                          style={
                            this.props.logincode === 800
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <p>二维码已失效</p>
                          <a
                            className="refresh"
                            onClick={(e) => this.props.refresh(e)}
                          >
                            点击刷新
                          </a>
                        </div>
                        <div className="qr-code">
                          <img src={this.props.qrimg} alt="Scan me" />
                        </div>
                      </div>

                      <p className="text">
                        使用&nbsp;
                        <a href="/download" className="link" target="_blank">
                          网易云音乐APP
                        </a>
                        &nbsp;扫码登录
                      </p>
                    </div>
                  </div>

                  <div
                    className="suc"
                    style={
                      this.props.logincode === 802
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    <div className="suc-icon"></div>
                    <p className="suc-text">扫描成功</p>
                    <p className="check-in-phone">请在手机上确认登录</p>
                  </div>

                  <div className="otherbtn">
                    <a className="other">选择其它登录模式</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="close" title="关闭窗体" onClick={this.props.close} />
        </div>
      </div>
    );
  }
}

export default Popuplogin;
