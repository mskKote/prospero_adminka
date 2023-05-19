export const methodTypes = {
  POST: "POST",
  PUT: "PUT",
  GET: "GET",
  DELETE: "DELETE"
} as const;

export type MethodType = typeof methodTypes[keyof typeof methodTypes];
