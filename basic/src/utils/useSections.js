import { useQuery } from '@tanstack/react-query';
import { getSections } from '../services/api';

export const useSections = () => {
  return useQuery({
    queryKey: ['sections'],
    queryFn: getSections
  });
};
