import { Page } from "@/shared/ui/Page/Page";
import { UserTable } from "./UserTable";
import type { User } from "@/domain/users/entities/User";
import { UsersTableHeader } from "./UsersTableHeader";

interface UserTableDataStateProps {
  users: User[];
}

export function UserTableDataState({ users }: UserTableDataStateProps) {
  return (
    <Page>
      <UsersTableHeader />

      <UserTable data={users} />
    </Page>
  );
}
