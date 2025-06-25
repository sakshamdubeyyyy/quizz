import { useMutation } from '@tanstack/react-query';
import { createSection } from '../services/api';

export const useAddSection = () => {
  return useMutation({
    mutationFn: createSection,
  });
};
