import { Page } from "@/ui/shared/Page/Page";
import { UserTable } from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";

export function UsersPage() {
  const { data: users } = useUsers();

  if (!users)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <UserTable data={users} />
    </Page>
  );
}
