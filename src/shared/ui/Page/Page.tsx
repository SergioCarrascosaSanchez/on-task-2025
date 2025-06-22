import type { ReactNode } from "@tanstack/react-router";
import "./Page.css";

export function Page({ children }: { children: ReactNode }) {
  return <div className="page">{children}</div>;
}
