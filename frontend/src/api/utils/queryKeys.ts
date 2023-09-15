enum Key {
  PublicFeed = "feed",
}

const queryKeys = {
  getPublicFeed: () => [Key.PublicFeed] as const,
};

export default queryKeys;
