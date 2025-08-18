import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/shared/ui/Button/Button";
import { UserForm } from "./UserForm";
import { useUpdateUser } from "../hooks/useUpdateUser";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";
import type { User } from "@/domain/users/entities/User";
import { useEffect } from "react";

interface UpdateUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
  user: User;
}

export function UpdateUserModal({
  isOpen,
  handleClose,
  user,
}: UpdateUserModalProps) {
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");
  const methods = useForm<UserToUpdate>();

  useEffect(() => {
    methods.setValue("fullName", user.fullName);
  }, [user]);

  const userUpdate = useUpdateUser();

  const onSubmit = (values: UserToUpdate) => {
    userUpdate.mutate(
      { user: values, id: user.id },
      {
        onSuccess: handleClose,
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("update_user")}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <UserForm isEdit />
        </FormProvider>
        <div className="flex justify-end items-center gap-2">
          <Button onClick={handleClose} variant={"outline"}>
            {tCommon("cancel")}
          </Button>
          <Button
            disabled={userUpdate.isPending}
            onClick={methods.handleSubmit(onSubmit)}
          >
            {tCommon("update")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
