import { useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const useGetAnalyticsQuery = () =>
  useQuery({
    queryKey: ['analytics'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/analytics',
        method: 'GET',
      }),
  });

export { useGetAnalyticsQuery };
