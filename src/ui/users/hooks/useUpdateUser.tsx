import { queryClient } from "@/app/queryClient";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToUpdate } from "@/domain/users/types/UserToUpdate";
import { UserApi } from "@/infrastructure/users/apis/UserApi";
import { UpdateUser } from "@/use-cases/users/UpdateUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useUpdateUser(api: UserRepository = UserApi) {
  const { t } = useTranslation("users");
  return useMutation({
    mutationFn: ({ user, id }: { user: UserToUpdate; id: string }) =>
      UpdateUser(api, user, id)(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success(t("user_updated"));
    },
    onError: () => {
      toast.error(t("error_updating"));
    },
  });
}
