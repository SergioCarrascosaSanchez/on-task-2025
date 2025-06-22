import { UsersPage } from "@/ui/users/pages/UsersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}
