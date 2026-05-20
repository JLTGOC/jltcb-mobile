import { MutationCache, QueryClient } from "@tanstack/react-query";

interface Meta extends Record<string, unknown> {
  invalidatesQuery?: readonly unknown[];
}

declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: Meta;
    mutationMeta: Meta;
  }
}

const mutationCache = new MutationCache({
  onSettled: (_data, _error, _variables, _context, mutation) => {
    const keysToInvalidate = mutation.meta?.invalidatesQuery;

    if (keysToInvalidate) {
      if (Array.isArray(keysToInvalidate[0])) {
        (keysToInvalidate as readonly (readonly unknown[])[]).forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      } else {
        queryClient.invalidateQueries({ queryKey: keysToInvalidate });
      }
    }
  },
});

export const queryClient = new QueryClient({
  mutationCache,
});
