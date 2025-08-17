import type { ReactNode } from "react";

interface SidebarLayoutProps {
  children: ReactNode;
}

interface SidebarProps {
  children: ReactNode;
}

interface ContentProps {
  children: ReactNode;
}

function SidebarLayoutRoot({ children }: SidebarLayoutProps) {
  return <div className="flex h-screen w-scree">{children}</div>;
}

function Sidebar({ children }: SidebarProps) {
  return <aside>{children}</aside>;
}

function Content({ children }: ContentProps) {
  return <main className="flex-1 p-4 overflow-auto">{children}</main>;
}

export const SidebarLayout = Object.assign(SidebarLayoutRoot, {
  Sidebar,
  Content,
});
