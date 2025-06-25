import { useMutation } from "@tanstack/react-query";
import { editQuestion } from "../services/api";

export const useEditQuestion = () => {
    return useMutation({
        mutationFn: editQuestion
    });
}