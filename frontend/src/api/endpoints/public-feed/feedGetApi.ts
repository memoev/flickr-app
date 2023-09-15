import { useQuery } from "@tanstack/react-query";
import { feedSchema } from "./feedTypes";
import { getBaseFeedApiUrl } from "../../../utils/environment";
import { makeApiRequest } from "../../useMakeRequest";
import pathBuilder from "../../utils/pathBuilder";
import prepareUrlParams from "../../utils/prepareUrlParams";
import queryKeys from "../../utils/queryKeys";

export const useGetFeedEndpoint = () => {
  const baseUrl = getBaseFeedApiUrl();
  return useQuery(queryKeys.getPublicFeed(), () => {
    const urlParams = prepareUrlParams();
    return makeApiRequest({
      baseUrl,
      urlPath: pathBuilder.buildPublicFeedPath(),
      responseDataSchema: feedSchema,
      urlSearchParams: new URLSearchParams(urlParams),
    });
  });
};
