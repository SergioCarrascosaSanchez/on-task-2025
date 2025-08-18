import { Input } from "@/shared/ui/Input/Input";
import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useUserTableStore } from "../stores/UserTableStore";

export function UserTableFilters() {
  const { t } = useTranslation("common");
  const { search, update } = useUserTableStore();
  return (
    <div className="my-4">
      <Input
        iconStart={<SearchIcon size={16} />}
        className="w-100"
        placeholder={t("search_placeholder")}
        value={search}
        onChange={(newSearch) =>
          update({ search: newSearch.target.value, page: 1 })
        }
      />
    </div>
  );
}
