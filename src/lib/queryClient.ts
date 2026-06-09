import {
  matchQuery,
  MutationCache,
  QueryClient,
  type QueryKey,
} from "@tanstack/react-query";

interface Meta extends Record<string, unknown> {
  invalidates?: QueryKey[];
}

declare module "@tanstack/react-query" {
  interface Register {
    mutationMeta: Meta;
  }
}

const mutationCache = new MutationCache({
  onSuccess: (_data, _variables, _context, mutation) => {
    queryClient.invalidateQueries({
      predicate: (query) =>
        // invalidate all matching tags at once
        // or everything if no meta is provided
        mutation.meta?.invalidates?.some((queryKey) =>
          matchQuery({ queryKey }, query),
        ) ?? true,
    });
  },
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
  mutationCache,
});
