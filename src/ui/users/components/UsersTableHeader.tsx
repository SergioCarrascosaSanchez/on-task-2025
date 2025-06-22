import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { useTranslation } from "react-i18next";

export function UsersTableHeader() {
  const { t } = useTranslation("users");
  return (
    <div className="flex justify-between items-center mb-5">
      <Typography variant="h1">{t("title")}</Typography>
      <Button>{t("new_user")}</Button>
    </div>
  );
}
