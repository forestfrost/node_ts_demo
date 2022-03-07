import { getStudentList, addStudent } from "@/controller/student";
export default [
  {
    route: "/student/getList",
    method: "get" as MyRequestType,
    cb: getStudentList,
  },
  {
    route: "/student/add",
    method: "post" as MyRequestType,
    cb: addStudent,
  },
];
