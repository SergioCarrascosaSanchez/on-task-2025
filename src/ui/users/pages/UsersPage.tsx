import { Page } from "@/shared/ui/Page/Page";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";
import { UserTableDataState } from "../components/UserTableDataState";

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
  return <UserTableDataState users={users} />;
}
