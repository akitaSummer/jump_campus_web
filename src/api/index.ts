import axios from "axios";

export const getJobList = async (
  pageSize: number,
  pageNumber: number,
  company: string,
  jobName?: string,
  jobIntroduceWorkPlace?: string,
  category?: string
) =>
  await axios.request({
    url: "/rec/school/recs",
    // url: "https://doudou0.online/rec/school/leihuo/recs",
    data: {
      pageSize,
      pageNumber,
      company,
      job_work_place_name: jobIntroduceWorkPlace || "",
      job_category_name: category,
      job_name: jobName || "",
    },
    method: "POST",
  });

export const getJobDetail = async (id: string) =>
  await axios.request({
    url: `/rec/school/recs/${id}`,
    // url: `https://doudou0.online/rec/school/leihuo/recs/${id}`,
    method: "GET",
  });

export const getCategoryList = async (company: string) =>
  await axios.request({
    url: `/rec/school/category_list`,
    method: "POST",
    data: {
      company,
    },
  });

export const getCityList = async (company: string) =>
  await axios.request({
    url: `rec/school/city_list`,
    method: "POST",
    data: {
      company,
    },
  });
