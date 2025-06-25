import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/api';

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
