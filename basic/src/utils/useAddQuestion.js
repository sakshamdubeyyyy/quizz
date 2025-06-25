import { useMutation } from "@tanstack/react-query"
import { createQuestion } from "../services/api"

export const useAddQuestion = () => {
    return useMutation({
        mutationFn: createQuestion
    })
}