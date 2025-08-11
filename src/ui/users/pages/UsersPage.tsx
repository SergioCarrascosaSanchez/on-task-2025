import { Page } from "@/shared/ui/Page/Page";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";
import { UserTableDataState } from "../components/UserTableDataState";
import { useUserTableStore } from "../stores/UserTableStore";
import { PAGE_SIZE } from "@/shared/constants/PageSize";

export function UsersPage() {
  const { search, page } = useUserTableStore();
  const { data: userList, isLoading, isError } = useUsers({ search, page });
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");

  if (isLoading)
    return (
      <Page>
        <p>{tCommon("loading")}</p>
      </Page>
    );
  if (!userList || isError)
    return (
      <Page>
        <p>{t("error_getting")}</p>
      </Page>
    );
  return (
    <UserTableDataState
      users={userList.users}
      totalPages={Math.ceil(userList.total / PAGE_SIZE)}
    />
  );
}
