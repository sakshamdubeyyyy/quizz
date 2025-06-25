import { useMutation } from "@tanstack/react-query";
import { editSection } from "../services/api";

export const useEditSection = () => {
    return useMutation({
        mutationFn: editSection
    });
}