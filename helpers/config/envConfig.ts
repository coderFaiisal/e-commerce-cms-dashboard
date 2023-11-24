export const getBaseUrl = (): string => {
  return (
    process.env.API_BASE_URL || "https://timeless-backend.vercel.app/api/v1"
  );
};

// https://timeless-backend.vercel.app/api/v1
