import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_projects/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_projects/projects"!</div>
}
