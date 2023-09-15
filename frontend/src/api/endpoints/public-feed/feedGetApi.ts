import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FeedItem, FeedItems, FeedRequest, feedSchema } from "./feedTypes";
import { getBaseFeedApiUrl } from "../../../utils/environment";
import { makeApiRequest } from "../../useMakeRequest";
import pathBuilder from "../../utils/pathBuilder";
import prepareUrlParams from "../../utils/prepareUrlParams";
import queryKeys from "../../utils/queryKeys";

export const useGetFeedEndpoint = () => {
  const baseUrl = getBaseFeedApiUrl();
  return useQuery(["feeds"], () => {
    return makeApiRequest({
      baseUrl,
      urlPath: pathBuilder.buildPublicFeedPath(),
      responseDataSchema: feedSchema,
    });
  });
};

export const useGetFeedEndpointWithParams = () => {
  const baseUrl = getBaseFeedApiUrl();
  const queryClient = useQueryClient();
  return useMutation(
    (params: FeedRequest) => {
      const urlParams = prepareUrlParams(params);
      return makeApiRequest({
        baseUrl,
        urlPath: pathBuilder.buildPublicFeedPath(),
        responseDataSchema: feedSchema,
        urlSearchParams: new URLSearchParams(urlParams),
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["feeds"], data);
      },
    }
  );
};
