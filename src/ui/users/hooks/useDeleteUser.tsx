import { queryClient } from "@/app/queryClient";
import type { User } from "@/domain/users/entities/User";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import { UserApi } from "@/infrastructure/users/apis/UserApi";
import { DeleteUser } from "@/use-cases/users/DeleteUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useDeleteUser(api: UserRepository = UserApi) {
  const { t } = useTranslation("users");
  return useMutation({
    mutationFn: ({ user }: { user: User }) => DeleteUser(api, user)(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success(t("user_deleted"));
    },
    onError: () => {
      toast.error(t("error_deleting"));
    },
  });
}
