import { useQuery } from '@tanstack/react-query';
import { getUserById } from '../services/api';

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: ['userById'],
    queryFn: () => getUserById(userId),
    select: (data) => data.data,
  });
};
