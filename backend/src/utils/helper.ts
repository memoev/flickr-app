import { FlickrCategory, FlickrEntry } from "../interfaces/Flickr";

interface PublicFeedResponse {
  title: string;
  tags: Array<string>;
  link: string;
}

const categoriesRestructure = (categories: Array<FlickrCategory>) => {
  const flattedCategories = categories.map((category) => category.$.term);
  const cleanCategories = flattedCategories.every((category) => category === "")
    ? []
    : flattedCategories;
  return cleanCategories;
};

export const modelTransformation = (
  data: Array<FlickrEntry>
): PublicFeedResponse[] => {
  const transformedData = data.map((entry) => {
    const { title, link, category } = entry;
    const enclosureLink = link.find((link) => link.$.type === "image/jpeg");
    const hrefImage = enclosureLink ? enclosureLink.$.href : undefined;

    return {
      title: !!title[0] ? title[0] : "Untitled",
      tags: categoriesRestructure(category),
      link: hrefImage,
    };
  });
  return transformedData;
};
