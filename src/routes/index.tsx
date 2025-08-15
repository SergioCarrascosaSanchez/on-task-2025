import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: () => redirect({ to: "/users" }),
});

function RouteComponent() {
  return <></>;
}
