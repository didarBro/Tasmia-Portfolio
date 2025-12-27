import { useGetUsersQuery } from "@/redux/features/user/userApi";
import useCurrentUserInfo from "@/hooks/useCurrentUserInfo";
import { TUser } from "../types/gobal";

const useCurrentUserData = () => {
  const { user } = useCurrentUserInfo();
  const {
    data: usersData,
    isLoading: isUserLoading,
    refetch,
  } = useGetUsersQuery({});
  const users = usersData?.data?.result || [];

  const currentUserInfo = user
    ? users.find((u: TUser) => u.email === user.email)
    : null;

  return { currentUserInfo, isUserLoading, refetch };
};

export default useCurrentUserData;
