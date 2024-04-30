import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useGetAllNotificationsQuery = () =>
  useQuery({
    queryKey: ['notifications'],
    queryFn: async () =>
      axiosBaseQuery({
        url: '/notifications',
        method: 'GET',
      }),
  });

const useUpdateNotificationMutation = () =>
  useMutation({
    mutationFn: async (notificationId: string) =>
      axiosBaseQuery({
        url: `/notifications/${notificationId}`,
        method: 'PATCH',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

export { useGetAllNotificationsQuery, useUpdateNotificationMutation };
