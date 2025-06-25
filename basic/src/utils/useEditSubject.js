import { useMutation } from "@tanstack/react-query";
import { editSubject } from "../services/api";

export const useEditSubject = () => {
    return useMutation({
        mutationFn: editSubject
    });
}