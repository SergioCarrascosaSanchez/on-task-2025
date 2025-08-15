/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { createTestI18n } from "@/shared/test/utils/createTestI18n";

type WrapperOptions = Omit<RenderOptions, "wrapper"> & {
  locale?: string;
};

function renderWithProviders(ui: ReactNode, options?: WrapperOptions) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  const i18n = createTestI18n(options?.locale ?? "en");

  return {
    i18n,
    ...render(
      <QueryClientProvider client={client}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </QueryClientProvider>,
      options as any
    ),
  };
}

export { renderWithProviders as render };
