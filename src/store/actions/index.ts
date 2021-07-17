import {
  UPDATEPAGELOADING,
  GETJOBLIST,
  ERROR,
  GETJOBDETAIL,
  GETCATEGORYLIST,
  GETCITYLIST,
} from "../constants";
import {
  getJobList,
  getJobDetail,
  getCategoryList,
  getCityList,
} from "../../api";

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

export const updateCityList = (data?: any) => {
  return data || data === null
    ? {
        type: GETCITYLIST,
        data,
      }
    : {
        type: ERROR,
        data: GETCITYLIST,
      };
};

export const updateCategoryList = (data?: any) => {
  return data || data === null
    ? {
        type: GETCATEGORYLIST,
        data,
      }
    : {
        type: ERROR,
        data: GETCATEGORYLIST,
      };
};

export const asyncGetJobList =
  (
    pageNumber: number,
    pageSize: number,
    company: string,
    jobName?: string,
    category?: string,
    jobIntroduceWorkPlace?: string
  ) =>
  async (dispatch: any) => {
    try {
      const { data } = await getJobList(
        pageSize,
        pageNumber,
        company,
        jobName,
        jobIntroduceWorkPlace,
        category
      );
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

export const asyncGetCategoryList =
  (company: string) => async (dispatch: any) => {
    try {
      const { data } = await getCategoryList(company);
      if (data === null) throw new Error("server error");
      dispatch(updateCategoryList(data));
    } catch (e) {
      dispatch(updateCategoryList());
      console.log(e);
    }
  };

export const asyncGetCityList = (company: string) => async (dispatch: any) => {
  try {
    const { data } = await getCityList(company);
    if (data === null) throw new Error("server error");
    dispatch(updateCityList(data));
  } catch (e) {
    dispatch(updateCityList());
    console.log(e);
  }
};
