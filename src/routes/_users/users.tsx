import { Sidebar } from "@/shared/ui/Sidebar/Sidebar";
import { SidebarLayout } from "@/shared/ui/SidebarLayout/SidebarLayout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_users/users")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarLayout>
      <SidebarLayout.Sidebar>
        <Sidebar />
      </SidebarLayout.Sidebar>
      <SidebarLayout.Content>
        <Outlet />
      </SidebarLayout.Content>
    </SidebarLayout>
  );
}
