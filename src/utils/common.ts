/**
 * @description 设置错误信息
 */
export function setErrorTemplate(code: number, message: string) {
  return {
    code,
    message,
    data: [],
  };
}
/**
 * @description 设置正常返回
 */
export function setNormalTemplate<T>(code: number, data: T) {
  return {
    code,
    message: "成功",
    data,
  };
}
/**
 * @description 参数必须传递
 */
export function notUndefined(params: Record<string, any>) {
  Object.keys(params).forEach((key) => {
    if (typeof params[key] == "undefined") {
      return `${key} is need`;
    }
  });
  return true;
}
