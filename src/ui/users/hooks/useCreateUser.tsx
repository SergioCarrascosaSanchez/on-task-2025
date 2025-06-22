import { queryClient } from "@/app/queryClient";
import type { UserRepository } from "@/domain/users/repositories/UserRepository";
import type { UserToCreate } from "@/domain/users/types/UserToCreate";
import { UserApi } from "@/infrastructure/users/apis/UserApi";
import { CreateUser } from "@/use-cases/users/CreateUser";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export function useCreateUser(api: UserRepository = UserApi) {
  const { t } = useTranslation("users");
  return useMutation({
    mutationFn: ({ user }: { user: UserToCreate }) => CreateUser(api, user)(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success(t("user_created"));
    },
    onError: () => {
      toast.error(t("error_creating"));
    },
  });
}
