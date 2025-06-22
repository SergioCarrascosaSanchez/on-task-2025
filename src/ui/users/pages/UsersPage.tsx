import { Page } from "@/shared/ui/Page/Page";
import { UserTable } from "../components/UserTable";
import { useUsers } from "../hooks/useUsers";
import { Typography } from "@/shared/ui/typography";
import { useTranslation } from "react-i18next";

export function UsersPage() {
  const { data: users, isLoading, isError } = useUsers();
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");

  if (isLoading)
    return (
      <Page>
        <p>{tCommon("loading")}</p>
      </Page>
    );
  if (!users || isError)
    return (
      <Page>
        <p>{t("error_getting")}</p>
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
