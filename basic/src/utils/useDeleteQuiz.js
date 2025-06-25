import { useMutation } from '@tanstack/react-query';
import { deleteQuiz } from '../services/api';

export const useDeleteQuiz = () => {
  return useMutation({
    mutationFn: deleteQuiz,
  });
};
