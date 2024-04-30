import { TSubscription } from '@/types/subscription';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { axiosBaseQuery } from '../axios/axiosBaseQuery';

const queryClient = new QueryClient();

const useCreateSubscriptionMutation = () =>
  useMutation({
    mutationFn: async (subscriptionData: TSubscription) =>
      axiosBaseQuery({
        url: '/subscriptions/create',
        method: 'POST',
        data: subscriptionData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

const useGetSingleSubscriptionQuery = (subscriptionId: string) =>
  useQuery({
    queryKey: ['subscription'],
    queryFn: async () =>
      axiosBaseQuery({
        url: `/subscriptions/${subscriptionId}`,
        method: 'GET',
      }),
  });

const useRenewOrUpdateSubscriptionMutation = () =>
  useMutation({
    mutationFn: async ({
      subscriptionId,
      updatedData,
    }: {
      subscriptionId: string;
      updatedData: Partial<TSubscription>;
    }) =>
      axiosBaseQuery({
        url: `/subscriptions/renew-or-upgrade-subscription/${subscriptionId}`,
        method: 'PATCH',
        data: updatedData,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscription', 'subscriptions'],
      });
    },
  });

const useCancelSubscriptionMutation = () =>
  useMutation({
    mutationFn: async subscriptionId =>
      axiosBaseQuery({
        url: `/subscriptions/cancel-subscription/${subscriptionId}`,
        method: 'PATCH',
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscription', 'subscriptions'],
      });
    },
  });

export {
  useCancelSubscriptionMutation,
  useCreateSubscriptionMutation,
  useGetSingleSubscriptionQuery,
  useRenewOrUpdateSubscriptionMutation,
};
