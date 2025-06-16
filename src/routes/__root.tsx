import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AppProvider } from "@/app/AppProvider";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </AppProvider>
  ),
});
