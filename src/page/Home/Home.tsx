import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import "./Home.scss";
import scene from "../../scene.svg";

import { getJobList } from "../../api/index";

import {
  StoreType,
  RootStateType,
  updatePageLoading,
  asyncGetCategoryList,
  asyncGetCityList,
  asyncGetJobList,
  updateJobList,
  ERROR,
  GETJOBLIST,
} from "../../store";
import { AnyCnameRecord } from "dns";

enum CompanyEunm {
  ALL = "all",
  NETEASE = "netease",
  BYTEDANCE = "bytedance",
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const debounce = (() => {
  let timeout: any;
  return (func: any, delay: number) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function () {
      func();
    }, delay);
  };
})();

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("全部");
  const [cityValue, setCityValue] = useState("全部");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const root = useSelector<StoreType, RootStateType>((state) => state.root);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const query = location.search
    .slice(1)
    .split("&")
    .reduce<any>((prev, item) => {
      const [key, value] = item.split("=");
      prev[key as string] = value as string;
      return prev;
    }, {});

  const getlist = (pageNumber: number, search?: string) => {
    setSearchValue(search || "");
    dispatch(updateJobList(null));
    setPage(pageNumber);
    debounce(() => {
      dispatch(
        asyncGetJobList(
          pageNumber,
          9,
          query.company || "netease",
          search || "",
          selectValue,
          cityValue
        )
      );
    }, 200);
  };

  useEffect(() => {
    getlist(1);
    setTimeout(() => {
      dispatch(updatePageLoading(false));
    }, 200);
  }, []);

  useEffect(() => {
    dispatch(updateJobList(null));
    dispatch(
      asyncGetJobList(
        1,
        9,
        query.company || "netease",
        searchValue || "",
        selectValue,
        cityValue
      )
    );
  }, [selectValue, cityValue]);

  useEffect(() => {
    if (root.actionType === ERROR && root.errMsg === GETJOBLIST) {
      setOpen(true);
    }
  }, [root]);

  useEffect(() => {
    dispatch(asyncGetCategoryList(query.company || "netease"));
    dispatch(asyncGetCityList(query.company || "netease"));
  }, []);

  return (
    <>
      <div className='topnavAndBanner'></div>
      <header className='App-header'>
        <div className='site-navigation'>
          <Link to='/' className='logo float-left m-0'>
            UFreedom
          </Link>
        </div>
      </header>
      <div className='title'>
        <h1 className='hero-heading'>UFreedom</h1>
        <h1 className='hero-heading'>校招内推</h1>
        <div
          className={classnames("line", {
            show: !root.pageLoading,
          })}></div>
        <p
          className={classnames("sub-text", {
            show: !root.pageLoading,
          })}>
          非常感谢各位同学通过我们网站投递简历，有任何意见或者想要获取更多内推岗位可关注“跳一下”微信公众号进行反馈
        </p>
        <img src={scene} className='scene' alt='logo' />
      </div>
      <div
        className={classnames("search", {
          show: !root.pageLoading,
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
            value={searchValue}
            onChange={(e) => {
              getlist(1, e.target.value);
            }}
          />
          <FormControl className={"companySelect"}>
            <InputLabel id='demo-simple-select-label'>分类</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={selectValue}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setSelectValue(event.target.value as CompanyEunm);
              }}>
              <MenuItem value={"全部"}>全部</MenuItem>
              {root.category &&
                root.category.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl className={"companySelect"}>
            <InputLabel id='demo-simple-select-label'>工作地点</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={cityValue}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCityValue(event.target.value as CompanyEunm);
              }}>
              <MenuItem value={"全部"}>全部</MenuItem>
              {root.citys &&
                root.citys.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div
        className={classnames("detail", {
          show: !root.pageLoading,
        })}>
        {!root.jobList &&
          new Array(9).fill(1).map((item, i) => {
            return (
              <Card key={i} className={"card"}>
                <CardContent>
                  {/* <Typography className={"title"} color='textSecondary' gutterBottom>
                  游戏研发工程师（服务端方向）
                </Typography> */}
                  <Typography
                    className={classnames(
                      "card-title",
                      "skeletonBg"
                    )}></Typography>
                  <Typography
                    className={classnames("pos", "skeletonBg")}
                    color='textSecondary'></Typography>
                  <Typography
                    className={classnames("card-detail", "skeletonBg")}
                    variant='body2'
                    component='p'></Typography>
                </CardContent>
                {/* <CardActions>
                <Button size='small'>Learn More</Button>
              </CardActions> */}
              </Card>
            );
          })}
        {root.jobList &&
          root.jobList.introduce_job_list.map((item, i) => {
            return (
              <Card
                className={"card"}
                key={item.id}
                onClick={() => {
                  window.scrollTo({
                    left: 0,
                    top: 0,
                  });
                  history.push(`/detail?id=${item.id}`);
                }}>
                <CardContent>
                  {/* <Typography className={"title"} color='textSecondary' gutterBottom>
                游戏研发工程师（服务端方向）
              </Typography> */}
                  <Typography className={classnames("card-title")}>
                    {item.job_name}
                  </Typography>
                  <Typography className={"pos"} color='textSecondary'>
                    <span className={classnames("iconfont", "icon-filesearch")}>
                      校招全职
                    </span>
                    <span
                      className={classnames("iconfont", "icon-academicdegree")}>
                      {item.job_category_name}
                    </span>
                    <span className={classnames("iconfont", "icon-name")}>
                      2022届
                    </span>
                    <span className={classnames("iconfont", "icon-school")}>
                      {item.job_work_place_name[0]}
                    </span>
                  </Typography>
                  <Typography variant='body2' component='p'>
                    公司：{query.company || "netease"}
                  </Typography>
                </CardContent>
                {/* <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions> */}
              </Card>
            );
          })}
      </div>
      <div
        className={classnames("footer", {
          show: !root.pageLoading,
        })}>
        {root.jobList && (
          <TablePagination
            rowsPerPageOptions={[]}
            colSpan={3}
            count={root.jobList.count_number}
            rowsPerPage={9}
            page={root.jobList.pageNumber - 1}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={(e, newPage: number) => {
              getlist(newPage + 1, searchValue);
              window.scrollTo({
                left: 0,
                top: 0,
              });
            }}
            onChangeRowsPerPage={() => {}}
          />
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={"error"}>
          "服务器出错，请在“跳一下”公众号反馈，谢谢"
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
