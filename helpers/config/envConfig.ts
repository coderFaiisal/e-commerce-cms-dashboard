export const getBaseUrl = (): string => {
  return (
    process.env.API_BASE_URL || 'https://ecommerce-cms-server.vercel.app/api/v1'
  );
};
