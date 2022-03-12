import { getSelectCourseList } from "@/controller/selectCourse";
export default [
  {
    route: "/selectCourse/getSelectCourse",
    method: "get" as MyRequestType,
    cb: getSelectCourseList,
  },
];
