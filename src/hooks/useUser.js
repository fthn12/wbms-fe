import {
  useGetUsersQuery,
  useSearchManyUsersQuery,
  useSearchFirstUserMutation,
  useCreateUserMutation,
} from "../slices/user/userSliceApi";

export const useUser = () => {
  return { useGetUsersQuery, useSearchManyUsersQuery, useSearchFirstUserMutation, useCreateUserMutation };
};
