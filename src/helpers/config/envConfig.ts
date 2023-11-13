export const getBaseUrl = (): string => {
  return process.env.NEXT_API_BASE_URL || "http://localhost:5000/";
};
