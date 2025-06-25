import { useQuery } from '@tanstack/react-query';
import { getUserResults } from '../services/api';

export const useGetUserResults = (userId) => {
  return useQuery({
    queryKey: ['userResults'],
    queryFn: () => getUserResults(userId),
    select: (data) => data.data,
  });
};
