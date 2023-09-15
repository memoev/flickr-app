enum Key {
  PublicFeed = "public-feed",
}

const queryKeys = {
  publicFeed: () => [Key.PublicFeed] as const,
};

export { queryKeys };
