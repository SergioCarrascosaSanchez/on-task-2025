import { Page } from "@/shared/ui/Page/Page";
import { UserTable } from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";
import { Typography } from "@/shared/ui/typography";
import { useTranslation } from "react-i18next";

export function UsersPage() {
  const { data: users } = useUsers();
  const { t } = useTranslation("users");

  if (!users)
    return (
      <Page>
        <p>Loading</p>
      </Page>
    );
  return (
    <Page>
      <Typography variant="h1" className="mb-5">
        {t("title")}
      </Typography>
      <UserTable data={users} />
    </Page>
  );
}
