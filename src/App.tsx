import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import "./scss/style.scss";
import "./App.scss";
import scene from "./scene.svg";

function App() {
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    window.onload = () => {
      setPageLoading(false);
    };
  }, []);
  return (
    <div className='App'>
      <div className='topnavAndBanner'></div>
      <header className='App-header'>
        <div className='site-navigation'>
          <a href='index.html' className='logo float-left m-0'>
            UFreedom
          </a>
        </div>
      </header>
      <div className='title'>
        <h1 className='hero-heading'>UFreedom</h1>
        <h1 className='hero-heading'>校招内推</h1>
        <div
          className={classnames("line", {
            show: !pageLoading,
          })}></div>
        <p
          className={classnames("sub-text", {
            show: !pageLoading,
          })}>
          非常感谢各位同学通过我们网站投递简历，有任何意见或者想要获取更多内推岗位可关注“跳一下”微信公众号进行反馈
        </p>
        <img src={scene} className='scene' alt='logo' />
      </div>
      <div
        className={classnames("search", {
          show: !pageLoading,
        })}>
        <div className={classnames("search-input")}>
          <TextField
            className='standard-full-width'
            label='搜索'
            style={{ margin: 8 }}
            placeholder='请输入您想投递的岗位'
            // helperText='Full width!'
            // fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <div
        className={classnames("detail", {
          show: !pageLoading,
        })}>
        {new Array(10).fill(1).map((item) => {
          console.log(item);
          return (
            <Card className={"card"}>
              <CardContent>
                {/* <Typography className={"title"} color='textSecondary' gutterBottom>
                  游戏研发工程师（服务端方向）
                </Typography> */}
                <Typography className={classnames("card-title")}>
                  游戏研发工程师（服务端方向）
                </Typography>
                <Typography className={"pos"} color='textSecondary'>
                  <span className={classnames("iconfont", "icon-filesearch")}>
                    校招全职
                  </span>
                  <span
                    className={classnames("iconfont", "icon-academicdegree")}>
                    技术
                  </span>
                  <span className={classnames("iconfont", "icon-name")}>
                    2022届
                  </span>
                  <span className={classnames("iconfont", "icon-school")}>
                    杭州
                  </span>
                </Typography>
                <Typography variant='body2' component='p'>
                  公司：netease
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions> */}
            </Card>
          );
        })}
        <Card className={"card"}>
          <CardContent>
            {/* <Typography className={"title"} color='textSecondary' gutterBottom>
              游戏研发工程师（服务端方向）
            </Typography> */}
            <Typography className={classnames("card-title")}>
              游戏研发工程师（服务端方向）
            </Typography>
            <Typography className={"pos"} color='textSecondary'>
              <span className={classnames("iconfont", "icon-filesearch")}>
                校招全职
              </span>
              <span className={classnames("iconfont", "icon-academicdegree")}>
                技术
              </span>
              <span className={classnames("iconfont", "icon-name")}>
                2022届
              </span>
              <span className={classnames("iconfont", "icon-school")}>
                杭州
              </span>
            </Typography>
            <Typography variant='body2' component='p'>
              公司：netease
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions> */}
        </Card>
      </div>
      <div
        className={classnames("footer", {
          show: !pageLoading,
        })}>
        <TablePagination
          rowsPerPageOptions={[]}
          colSpan={3}
          count={10}
          rowsPerPage={5}
          page={0}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: true,
          }}
          onChangePage={() => {}}
          onChangeRowsPerPage={() => {}}
        />
      </div>
    </div>
  );
}

export default App;
