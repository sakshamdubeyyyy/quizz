import { useQuery } from '@tanstack/react-query';
import { getCodingQuizzes } from '../services/api';

export const useGetCodingQuizzes = () => {
  return useQuery({
    queryKey: ['codingQuizzes'],
    queryFn: getCodingQuizzes
  });
};
