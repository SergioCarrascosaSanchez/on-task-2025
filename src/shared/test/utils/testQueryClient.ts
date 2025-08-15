import { QueryClient } from "@tanstack/react-query";

export function createTestQueryClient() {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return client;
}
