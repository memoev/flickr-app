import { z } from "zod";
import { JsonData, JsonSchema } from "./utils/jsonDataTypes";
import { getRequestBody } from "./utils/getRequestBody";
import isErrorResponse, { ProjectError } from "./utils/ApiError";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type MakeRequestOptions<T extends JsonSchema, U extends JsonSchema> = {
  baseUrl: string;
  requestHeaders?: Headers;
  urlPath?: string;
  method?: HttpMethod;
  urlSearchParams?: URLSearchParams;
  requestData?: JsonData | FormData;
  responseDataSchema?: T;
  requestDataSchema?: U;
};

// A "conditional type", which can infer whether or not a reponseDataSchema is provided
type ResponseTypes<T> = T extends { responseDataSchema: JsonSchema }
  ? z.infer<T["responseDataSchema"]>
  : undefined;

export async function makeApiRequest<
  T extends MakeRequestOptions<JsonSchema, JsonSchema>
>({
  baseUrl,
  requestHeaders,
  urlPath,
  method,
  urlSearchParams,
  requestData,
  responseDataSchema,
  requestDataSchema,
}: T): Promise<ResponseTypes<T>> {
  const body = getRequestBody(requestData, requestDataSchema);

  const queryString = urlSearchParams ? `?${urlSearchParams}` : "";
  const urlWithPath = urlPath ? `${baseUrl}/${urlPath}` : baseUrl;
  const fullUrl = `${urlWithPath}${queryString}`;

  const response = await fetch(fullUrl, {
    method,
    headers: requestHeaders,
    body,
  }).catch((e) => {
    console.error(e);
    throw new Error(`Network error calling ${baseUrl}: ${e}`);
  });

  // The below type casts are currently a limitation on the typescript compiler
  // Using unspecified generic types with a conditional type, it cannot infer
  // Issue details here: https://github.com/microsoft/TypeScript/issues/33912
  // Helpful discussion here: https://stackoverflow.com/a/66553240
  if (responseDataSchema) {
    const res = (await response.json()) as z.infer<typeof responseDataSchema>;
    console.log(res);

    if (response.status === 400 && isErrorResponse(res)) {
      throw new ProjectError({
        errors: res.errors,
        message: res.errorMessage,
        statusCode: 400,
      });
    } else if (!response.ok) {
      console.error(`Request returned status code: ${response.status}`);
      throw new Error(
        `There was an error with your request, please try again.`
      );
    }

    return responseDataSchema.parse(res) as ResponseTypes<T>;
  } else {
    // Intentionally return undefined if a responseDataSchema is not provided
    return undefined as ResponseTypes<T>;
  }
}
