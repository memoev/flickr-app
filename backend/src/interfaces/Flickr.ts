interface FlickrLink {
  $: {
    href: string;
    type: string;
  };
}

export interface FlickrCategory {
  $: {
    term: string;
  };
}

export interface FlickrEntry {
  title: Array<string>;
  link: Array<FlickrLink>;
  category: Array<FlickrCategory>;
}

export interface FlickrResponse {
  feed: {
    entry: Array<FlickrEntry>;
  };
}
