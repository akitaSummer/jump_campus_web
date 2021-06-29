import axios from "axios";

export const getJobList = async (
  pageSize: number,
  pageNumber: number,
  jobName?: string
) =>
  await axios.request({
    url: "/rec/school/leihuo/recs",
    // url: "https://doudou0.online/rec/school/leihuo/recs",
    data: {
      pageSize,
      pageNumber,
      // "job_introduce_work_place[]": 1,
      job_name: jobName || "",
    },
    method: "POST",
  });

export const getJobDetail = async (id: string) =>
  await axios.request({
    url: `/rec/school/leihuo/recs/${id}`,
    // url: `https://doudou0.online/rec/school/leihuo/recs/${id}`,
    method: "GET",
  });
