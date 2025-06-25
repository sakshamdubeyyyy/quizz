import { useMutation } from '@tanstack/react-query';
import { createSubject } from '../services/api';

export const useAddSubject = () => {
  return useMutation({
    mutationFn: createSubject
  });
};
