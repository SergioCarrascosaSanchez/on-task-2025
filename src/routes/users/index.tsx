import { UsersPage } from "@/ui/users/pages/UsersPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UsersPage />;
}
