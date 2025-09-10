import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import "@/index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/lib/queryClient";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";
import { SidebarLayout } from "@/shared/ui/SidebarLayout/SidebarLayout";
import { Sidebar } from "@/shared/ui/Sidebar/Sidebar";

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarLayout>
          <SidebarLayout.Sidebar>
            <Sidebar />
          </SidebarLayout.Sidebar>
          <SidebarLayout.Content>
            <Outlet />
          </SidebarLayout.Content>
        </SidebarLayout>
        <TanStackRouterDevtools position="bottom-right" />
        <Toaster position="bottom-center" />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  ),
});
