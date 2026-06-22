'use client';
import { getMe } from '@/action';
import { useQuery } from '@tanstack/react-query';

export default function userAuth() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await getMe();
      if (res.error) {
        throw res.error;
      }
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
  // console.log(data);
  const value = {
    user: data?.user ?? null,
    profile: data?.settings ?? null,
    loading: isLoading,
    refetch: () => {
      void refetch();
    },
  };

  return value;
}
