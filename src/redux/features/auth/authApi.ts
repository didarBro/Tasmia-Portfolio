import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userInfo) => {
        console.log("Attempting login with:", userInfo);

        return {
          url: "auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    signup: builder.mutation({
      query: (userData) => {
        console.log("Attempting signup with:", userData);

        return {
          url: "/auth/signup",
          method: "POST",
          body: userData,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useSignupMutation } = authApi;
