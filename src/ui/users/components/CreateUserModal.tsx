import type { User } from "@/domain/users/entities/User";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { UserForm } from "./UserForm";

interface CreateUserModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function CreateUserModal({ isOpen, handleClose }: CreateUserModalProps) {
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");
  const methods = useForm<Exclude<User, "id">>();

  const onSubmit = (values: Exclude<User, "id">) => {
    console.log(values);
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
          <Button onClick={methods.handleSubmit(onSubmit)}>
            {t("create_user")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
