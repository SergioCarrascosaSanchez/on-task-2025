import type { UserToCreate } from "@/domain/users/types/UserToCreate";
import { Input } from "@/shared/ui/Input";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UserFormProps {
  isEdit?: boolean;
}

export function UserForm({ isEdit = false }: UserFormProps) {
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
        data-testid={"fullName"}
        error={errors.fullName?.message}
        {...register("fullName", {
          required: tCommon("errors.required"),
        })}
      />
      {!isEdit && (
        <Input
          label={t("email")}
          type="email"
          required
          disabled={isEdit}
          data-testid={"email"}
          placeholder={tCommon("input_placeholder")}
          error={errors.email?.message}
          {...register("email", {
            validate: (value) =>
              !isEdit && !value ? tCommon("errors.required") : true,
          })}
        />
      )}
    </div>
  );
}
