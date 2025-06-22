import type { UserToCreate } from "@/domain/users/types/UserToCreate";
import { Input } from "@/shared/ui/input";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function UserForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserToCreate>();
  const { t } = useTranslation("users");
  const { t: tCommon } = useTranslation("common");
  return (
    <div className="flex flex-col gap-4 mt-2">
      <Input
        label={t("full_name")}
        placeholder={tCommon("input_placeholder")}
        required
        error={errors.fullName?.message}
        {...register("fullName", {
          required: tCommon("errors.required"),
        })}
      />
      <Input
        label={t("email")}
        type="email"
        required
        placeholder={tCommon("input_placeholder")}
        error={errors.email?.message}
        {...register("email", {
          required: tCommon("errors.required"),
        })}
      />
    </div>
  );
}
