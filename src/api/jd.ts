import request from "@/utils/fetch";
import { JDURL } from "@/utils/config";

/**
 * @description
 */
export function getHTMLFromJD(params: { enc: string; keyword: string }, cookie: string) {
  return request({
    url: JDURL,
    method: "GET",
    params,
    headers: {
      cookie,
    },
  });
}
