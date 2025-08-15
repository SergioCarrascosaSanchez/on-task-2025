import type { User } from "@/domain/users/entities/User";
import { TableActions, TableCell, TableRow } from "@/shared/ui/Table";
import { PencilIcon, Trash2 } from "lucide-react";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { useState } from "react";
import { UpdateUserModal } from "./UpdateUserModal";
import { IconButton } from "@/shared/ui/IconButton";

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
        <IconButton
          data-testid="edit-button"
          onClick={() => setIsUpdateModalOpen(true)}
          icon={<PencilIcon size={16} color={"var(--foreground)"} />}
        />
        <IconButton
          data-testid="delete-button"
          onClick={() => deleteUser({ user })}
          icon={
            <Trash2
              size={16}
              color={
                isDeleting ? "var(--muted-foreground)" : "var(--destructive)"
              }
            />
          }
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
