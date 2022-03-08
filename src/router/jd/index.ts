import { _getHTMLFromJD } from "@/controller/jd";
export default [
  {
    route: "/jd/getHTML",
    method: "get" as MyRequestType,
    cb: _getHTMLFromJD,
  },
];
