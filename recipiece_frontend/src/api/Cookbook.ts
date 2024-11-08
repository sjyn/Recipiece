import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cookbook, ListCookbookFilters, Recipe } from "../data";
import { MutationArgs, QueryArgs, useDelete, useGet, usePost, usePut } from "./Request";

export const useGetCookbookByIdQuery = (cookbookId: number, args?: QueryArgs) => {
  const { getter } = useGet();

  const query = async () => {
    const recipe = await getter<never, Recipe>({
      path: `/cookbook/${cookbookId}`,
      withAuth: true,
    });
    return recipe.data;
  };

  return useQuery({
    queryKey: ["cookbook", cookbookId],
    queryFn: query,
    enabled: args?.disabled !== true,
    retry: 0,
  });
};

export const useListCookbooksQuery = (filters: ListCookbookFilters, args?: QueryArgs) => {
  const queryClient = useQueryClient();
  const { getter } = useGet();

  const queryKey = ["cookbookList", filters.page];
  if (filters.search) {
    queryKey.push(filters.search);
  }

  let path = `/cookbook/list?page=${filters.page}`;
  if (filters.search) {
    path += `&search=${filters.search}`;
  }

  const query = async () => {
    const cookbooks = await getter<never, { readonly data: Cookbook[]; readonly page: number; readonly hasNextPage: boolean }>({
      path: path,
      withAuth: true,
    });
    return cookbooks;
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      try {
        const results = await query();
        results.data.data.forEach((cookbook) => {
          queryClient.setQueryData(["cookbook", cookbook.id], cookbook);
        });
        return results.data;
      } catch (err) {
        throw err;
      }
    },
    enabled: args?.disabled !== true,
  });
};

export const useCreateCookbookMutation = (args?: MutationArgs<Cookbook>) => {
  const queryClient = useQueryClient();
  const { poster } = usePost();

  const mutation = async (data: Partial<Cookbook>) => {
    return await poster<Partial<Cookbook>, Cookbook>({
      path: "/cookbook",
      body: data,
      withAuth: true,
    });
  };

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cookbookList"],
        refetchType: "all",
      });
      queryClient.setQueryData(["cookbook", data.data.id], data.data);
      args?.onSuccess?.(data.data);
    },
    onError: (err) => {
      args?.onFailure?.(err);
    },
  });
};

export const useUpdateCookbookMutation = (args?: MutationArgs<Cookbook>) => {
  const queryClient = useQueryClient();
  const { putter } = usePut();

  const mutation = async (data: Partial<Cookbook>) => {
    return await putter<Partial<Cookbook>, Cookbook>({
      path: "/cookbook",
      body: data,
      withAuth: true,
    });
  };

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cookbookList"],
        refetchType: "all",
      });
      queryClient.setQueryData(["cookbook", data.data.id], data.data);
      args?.onSuccess?.(data.data);
    },
    onError: (err) => {
      args?.onFailure?.(err);
    },
  });
};

export const useDeleteCookbookMutation = (args?: MutationArgs<void>) => {
  const queryClient = useQueryClient();
  const { deleter } = useDelete();

  const mutation = async (cookbookId: number) => {
    return await deleter({
      path: "/cookbook",
      id: cookbookId,
      withAuth: true,
    });
  };

  return useMutation({
    mutationFn: mutation,
    onSuccess: (_, cookbookId) => {
      queryClient.invalidateQueries({
        queryKey: ["cookbookList"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["cookbook", cookbookId],
      });
      args?.onSuccess?.();
    },
    onError: (err) => {
      args?.onFailure?.(err);
    },
  });
};

export const useAttachRecipeToCookbookMutation = (args?: MutationArgs<void>) => {
  const queryClient = useQueryClient();
  const { poster } = usePost();

  const mutation = async (data: {readonly recipe_id: number, readonly cookbook_id: number}) => {
    return await poster<typeof data, void>({
      path: "/cookbook/recipe/add",
      body: data,
      withAuth: true,
    });
  };

  return useMutation({
    mutationFn: mutation,
    onSuccess: (data) => {
      
      // queryClient.invalidateQueries({
      //   queryKey: ["cookbookList"],
      //   refetchType: "all",
      // });
      // queryClient.setQueryData(["cookbook", data.data.id], data.data);
      args?.onSuccess?.(data.data);
    },
    onError: (err) => {
      args?.onFailure?.(err);
    },
  });
}