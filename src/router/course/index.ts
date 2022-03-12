import { addCourse, getCourseList } from "@/controller/course";
export default [
  {
    route: "/course/add",
    method: "post" as MyRequestType,
    cb: addCourse,
  },
  {
    route: "/course/get",
    method: "get" as MyRequestType,
    cb: getCourseList,
  },
];
