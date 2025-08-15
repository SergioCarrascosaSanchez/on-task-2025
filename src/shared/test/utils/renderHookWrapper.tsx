import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import { renderHook } from "@testing-library/react";
import { createTestQueryClient } from "./testQueryClient";
import { createTestI18n } from "@/shared/test/utils/createTestI18n";

type Options = {
  lang?: string;
  client?: ReturnType<typeof createTestQueryClient>;
};

function Providers({
  children,
  client,
  lang,
}: {
  children: ReactNode;
  client?: ReturnType<typeof createTestQueryClient>;
  lang?: string;
}) {
  const queryClient = client ?? createTestQueryClient();
  const i18n = createTestI18n(lang);
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </I18nextProvider>
  );
}

export function renderHookWithProviders<TProps, TResult>(
  callback: (initialProps: TProps) => TResult,
  { lang = "en", client }: Options = {}
) {
  const queryClient = client ?? createTestQueryClient();
  const utils = renderHook(callback, {
    wrapper: ({ children }) => (
      <Providers client={queryClient} lang={lang}>
        {children}
      </Providers>
    ),
  });
  return { ...utils, queryClient };
}
