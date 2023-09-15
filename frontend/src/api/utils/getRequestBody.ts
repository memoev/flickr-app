import { JsonData, JsonSchema } from "./jsonDataTypes";

export const getRequestBody = (
  requestData: FormData | JsonData | undefined,
  requestDataSchema: JsonSchema | undefined
) => {
  if (!requestData) {
    return undefined;
  } else if (requestData instanceof FormData) {
    return requestData;
  } else if (requestDataSchema) {
    const result = requestDataSchema.parse(requestData);
    return JSON.stringify(result);
  } else {
    // Purposely never allow request body data unless a validating schema exists
    throw new Error("Request data is not allowed for this type of request.");
  }
};
