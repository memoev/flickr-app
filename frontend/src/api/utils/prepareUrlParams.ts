/**
 * The URLSearchParams object consumed by makeApiRequest requires the
 * sent param values to be strings. This helper will help convert primitive
 * value types to be strings such that they can be passed to the request helper
 */
const prepareUrlParams = (
  params?: Record<string, string | number | boolean | unknown[]>
) => {
  if (!params) {
    return {};
  }
  Object.keys(params).forEach((item) => {
    if (params[item]) {
      params[item] = params[item].toString();
    }
  });
  return params as Record<string, string>;
};

export default prepareUrlParams;
