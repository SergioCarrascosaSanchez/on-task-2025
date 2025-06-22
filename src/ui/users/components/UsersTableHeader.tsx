import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CreateUserModal } from "./CreateUserModal";

export function UsersTableHeader() {
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] =
    useState<boolean>(false);
  const { t } = useTranslation("users");
  return (
    <div className="flex justify-between items-center mb-5">
      <Typography variant="h1">{t("title")}</Typography>
      <Button onClick={() => setIsCreateUserModalOpen(true)}>
        {t("new_user")}
      </Button>
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        handleClose={() => setIsCreateUserModalOpen(false)}
      />
    </div>
  );
}
