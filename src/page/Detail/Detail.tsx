import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import ClipboardJS from "clipboard";
import QRCode from "qrcode.react";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import { Link, useLocation } from "react-router-dom";
import "./Detail.scss";
import scene from "../../scene.svg";

import {
  StoreType,
  RootStateType,
  asyncGetJobDetail,
  ERROR,
  GETJOBDETAIL,
  updateJobDetail,
} from "../../store";
import { RoomTwoTone } from "@material-ui/icons";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const Detail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const root = useSelector<StoreType, RootStateType>((state) => state.root);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState<any>("success");
  const [alertMsg, setAlertMsg] = useState("复制地址成功!");
  const handleClick = (type: any, value: boolean) => {
    setTimeout(() => {
      setOpen(false);
    }, 1000);
    setAlertType(type);
    setAlertMsg(alertType === "success" ? "复制地址成功!" : "复制地址失败!");
    setOpen(value);
  };
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const clipboard = new ClipboardJS(".detail-copy-link", {
      text: function () {
        return `https://new.hi.163.com/leihuoneitui/?#/?introduce_id=gruibfhpufrxx2io&&id_token=41ae35de511bde9acc2189e39b5e0d6e&&project_id=1000000358&&job_introduce_id=${root.jobDetail?.id}`;
      },
    });
    clipboard.on("success", function (e) {
      console.log(e);
      handleClick("success", true);
    });
    clipboard.on("error", function (e) {
      console.log(e);
      handleClick("error", true);
    });

    const id = location.search.slice(1).split("=")[1];
    dispatch(asyncGetJobDetail(id));
    return () => {
      dispatch(updateJobDetail(null));
    };
  }, []);

  useEffect(() => {
    if (root.actionType === ERROR && root.errMsg === GETJOBDETAIL) {
      setAlertType("error");
      setAlertMsg("服务器出错，请在“跳一下”公众号反馈，谢谢");

      setOpen(true);
    }
  }, [root]);

  return (
    <>
      <div className='topnavAndBanner'></div>
      <header className='App-header'>
        <div className='site-navigation'>
          <Link to='/' className='logo float-left m-0'>
            <IconButton component='span'>
              <ArrowBackIcon style={{ fontSize: 40 }} />
            </IconButton>
          </Link>
        </div>
      </header>
      {!root.jobDetail && (
        <>
          <div className='detail-title'>
            <h1
              className={classnames(
                "hero-heading",
                "skeletonBg",
                "detail-title-job"
              )}
              style={{
                width: "70%",
                height: 30,
                marginLeft: "auto",
                marginRight: "auto",
              }}></h1>
            <h1
              className={classnames(
                "hero-heading",
                "skeletonBg",
                "detail-title-request"
              )}
              style={{
                width: "70%",
                height: 25,
                marginLeft: "auto",
                marginRight: "auto",
              }}></h1>
            <div
              className={classnames(
                "hero-heading",
                "skeletonBg",
                "detail-title-company"
              )}
              style={{
                width: 100,
                height: 20,
                marginLeft: "auto",
                marginRight: "auto",
              }}></div>
            <img src={scene} className='scene' alt='logo' />
          </div>
          <div className={classnames("detail-content")}>
            <div className={classnames("detail-job-title")}>岗位描述</div>
            <div className={classnames("detail-job-con")}>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
            </div>
            <div className={classnames("detail-job-title")}>岗位要求</div>
            <div className={classnames("detail-job-con")}>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
              <div
                className={classnames("skeletonBg")}
                style={{
                  width: "90%",
                  height: 25,
                  margin: "20px auto 10px",
                }}></div>
            </div>
          </div>
        </>
      )}
      {root.jobDetail && (
        <>
          <div className='detail-title'>
            <h1 className='hero-heading'>{root.jobDetail.job_name}</h1>
            <h1 className='hero-heading'>
              <span className={classnames("iconfont", "icon-filesearch")}>
                校招全职
              </span>
              <span className={classnames("iconfont", "icon-academicdegree")}>
                {root.jobDetail.job_category_name}
              </span>
              <span className={classnames("iconfont", "icon-name")}>
                2022届
              </span>
              <span className={classnames("iconfont", "icon-school")}>
                杭州
              </span>
            </h1>
            <span className='hero-heading'>公司：netease</span>
            <img src={scene} className='scene' alt='logo' />
          </div>
          <div className={classnames("detail-content")}>
            <div className={classnames("detail-job-title")}>岗位描述</div>
            <div className={classnames("detail-job-con")}>
              {root.jobDetail.job_description}
            </div>
            <div className={classnames("detail-job-title")}>岗位要求</div>
            <div className={classnames("detail-job-con")}>
              {root.jobDetail.job_requirement}
            </div>
          </div>
          <div className={classnames("detail-footer")}>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                window.open(
                  `https://new.hi.163.com/leihuoneitui/?#/?introduce_id=gruibfhpufrxx2io&&id_token=41ae35de511bde9acc2189e39b5e0d6e&&project_id=1000000358&&job_introduce_id=${root.jobDetail?.id}`
                );
              }}>
              点我投递
            </Button>
            <div className={"detail-code"}>
              <QRCode
                className={"detail-qrcode"}
                value={`https://new.hi.163.com/leihuoneitui/?#/?introduce_id=gruibfhpufrxx2io&&id_token=41ae35de511bde9acc2189e39b5e0d6e&&project_id=1000000358&&job_introduce_id=${root.jobDetail?.id}`}
              />
              <span className='hero-heading'>扫码投递</span>
            </div>
            <Button variant='outlined' className={"detail-copy-link"}>
              复制地址
            </Button>
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {alertMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Detail;
