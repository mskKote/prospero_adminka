export const tagTypes = {
  SOURCES_TAG: "SEARCH_TAG",
  SESSION_TAG: 'SESSION_TAG'
} as const;

export type TagType = typeof tagTypes[keyof typeof tagTypes];
