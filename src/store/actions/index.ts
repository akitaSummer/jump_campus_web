import {
  UPDATEPAGELOADING,
  GETJOBLIST,
  ERROR,
  GETJOBDETAIL,
} from "../constants";
import { getJobList, getJobDetail } from "../../api";
import { JobListType } from "../reducers";

export const updatePageLoading = (data: boolean) => {
  return {
    type: UPDATEPAGELOADING,
    data,
  };
};

export const updateJobDetail = (data?: any) => {
  return data || data === null
    ? {
        type: GETJOBDETAIL,
        data,
      }
    : {
        type: ERROR,
        data: GETJOBDETAIL,
      };
};

export const updateJobList = (data?: any) => {
  return data || data === null
    ? {
        type: GETJOBLIST,
        data,
      }
    : {
        type: ERROR,
        data: GETJOBLIST,
      };
};

export const asyncGetJobList =
  (pageNumber: number, pageSize: number, jobName?: string) =>
  async (dispatch: any) => {
    try {
      const { data } = await getJobList(pageSize, pageNumber, jobName);
      if (data === null) throw new Error("server error");
      dispatch(updateJobList(data));
    } catch (e) {
      dispatch(updateJobList());
      console.log(e);
    }
  };

export const asyncGetJobDetail = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await getJobDetail(id);
    if (data === null) throw new Error("server error");
    dispatch(updateJobDetail(data));
  } catch (e) {
    dispatch(updateJobDetail());
    console.log(e);
  }
};
