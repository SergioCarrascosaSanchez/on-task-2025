import type { User } from "@/domain/users/entities/User";
import { TableActions, TableCell, TableRow } from "@/shared/ui/table";
import { PencilIcon, Trash2 } from "lucide-react";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useState } from "react";
import { UpdateUserModal } from "./UpdateUserModal";

interface UserTableRowProps {
  user: User;
}

export function UserTableRow({ user }: UserTableRowProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const { isPending: isDeleting, mutate: deleteUser } = useDeleteUser();

  return (
    <TableRow>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableActions>
        <PencilIcon
          onClick={() => setIsUpdateModalOpen(true)}
          size={18}
          color={"var(--foreground)"}
        />
        <Trash2
          onClick={() => deleteUser({ user })}
          size={18}
          color={isDeleting ? "var(--muted-foreground)" : "var(--destructive)"}
        />
      </TableActions>
      <UpdateUserModal
        user={user}
        isOpen={isUpdateModalOpen}
        handleClose={() => setIsUpdateModalOpen(false)}
      />
    </TableRow>
  );
}
