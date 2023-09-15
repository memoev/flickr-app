enum Key {
  PublicFeed = "public-feed",
}

const queryKeys = {
  getPublicFeed: () => [Key.PublicFeed] as const,
};

export default queryKeys;
