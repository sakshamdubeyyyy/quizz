import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/api';

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
