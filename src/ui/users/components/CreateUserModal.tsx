import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/Dialog";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/shared/ui/Button";
import { UserForm } from "./UserForm";
import { useCreateUser } from "../hooks/useCreateUser";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";

interface CreateUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function CreateUserModal({ isOpen, handleClose }: CreateUserModalProps) {
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");
  const methods = useForm<UserToCreate>();
  const userCreation = useCreateUser();

  const onSubmit = (values: UserToCreate) => {
    userCreation.mutate(
      { user: values },
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
          <DialogTitle>{t("new_user")}</DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <UserForm />
        </FormProvider>
        <div className="flex justify-end items-center gap-2">
          <Button onClick={handleClose} variant={"outline"}>
            {tCommon("cancel")}
          </Button>
          <Button
            disabled={userCreation.isPending}
            onClick={methods.handleSubmit(onSubmit)}
          >
            {t("create_user")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
