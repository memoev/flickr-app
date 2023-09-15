import { useQuery, useQueryClient } from "react-query";
import { makeApiRequest } from "../../useMakeRequest";
import { queryKeys } from "../../utils/queryKeys";
import { getBaseFeedApiUrl } from "../../../utils/environment";
import pathBuilder from "../../utils/pathBuilder";
import { feedItemSchema } from "./feedTypes";

export const useGetFeed = () => {
  const queryClient = useQueryClient();
  const baseUrl = getBaseFeedApiUrl();

  return useQuery(
    queryKeys.publicFeed(),
    () => {
      return makeApiRequest({
        baseUrl,
        urlPath: pathBuilder.buildPublicFeedPath(),
        responseDataSchema: feedItemSchema,
      });
    },
    {
      initialData: () => {
        return queryClient.getQueryData(queryKeys.publicFeed());
      },
    }
  );
};
