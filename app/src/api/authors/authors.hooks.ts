import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthor,
  deleteAuthor,
  fetchAuthorById,
  fetchAuthors,
  replaceAuthor,
  updateAuthor,
} from "./authors.api";

export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });
};

export const useAuthor = (id?: string, enabled = true) => {
  return useQuery({
    queryKey: ["author", id],
    queryFn: () => fetchAuthorById(id as string),
    enabled: !!id && enabled,
  });
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
};

export const useReplaceAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: replaceAuthor,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["author", variables.id] });
    },
  });
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAuthor,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["author", variables.id] });
    },
  });
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAuthor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
};