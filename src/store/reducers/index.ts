import { combineReducers } from "redux";
import {
  UPDATEPAGELOADING,
  ERROR,
  GETJOBLIST,
  GETJOBDETAIL,
  GETCITYLIST,
  GETCATEGORYLIST,
} from "../constants";

export type IntroduceJobType = {
  id: number;
  job_name: string;
  job_work_place_name: string[];
  job_description: string;
  job_requirement: string;
  job_category_name: string;
  company: string;
  short_url: string;
};

export type JobListType = {
  page_count: number;
  last_page: boolean;
  count_number: number;
  pageNumber: number;
  introduce_job_list: IntroduceJobType[];
};

export type RootStateType = {
  pageLoading: boolean;
  actionType: string;
  errMsg: string;
  jobList: JobListType | null;
  jobDetail: IntroduceJobType | null;
  citys: string[];
  category: string[];
};

const ROOT_INITIAL_STATE: RootStateType = {
  pageLoading: true,
  actionType: "default",
  jobList: null,
  errMsg: "",
  jobDetail: null,
  citys: [],
  category: [],
};

const root = (
  state = ROOT_INITIAL_STATE,
  actions: { type: any; data: any }
) => {
  switch (actions.type) {
    case UPDATEPAGELOADING:
      return {
        ...state,
        actionType: actions.type,
        pageLoading: actions.data,
      };
    case GETJOBLIST:
      return {
        ...state,
        actionType: actions.type,
        jobList: actions.data,
      };
    case GETJOBDETAIL:
      return {
        ...state,
        actionType: actions.type,
        jobDetail: actions.data,
      };
    case GETCATEGORYLIST:
      return {
        ...state,
        actionType: actions.type,
        category: actions.data,
      };
    case GETCITYLIST:
      return {
        ...state,
        actionType: actions.type,
        citys: actions.data,
      };
    case ERROR:
      return {
        ...state,
        actionType: actions.type,
        errMsg: actions.data,
      };
    default:
      return {
        ...state,
        actionType: actions.type,
      };
  }
};

export default combineReducers({ root });
