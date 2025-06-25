import { useQuery } from '@tanstack/react-query';
import { getQuizzes } from '../services/api';

export const useGetQuizzes = () => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: getQuizzes
  });
};
