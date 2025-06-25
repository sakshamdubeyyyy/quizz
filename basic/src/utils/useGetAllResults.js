import { useQuery } from '@tanstack/react-query';
import { getAllResults } from '../services/api';

export const useGetAllResults = () => {
  return useQuery({
    queryKey: ['allresults'],
    queryFn: getAllResults
  });
};
