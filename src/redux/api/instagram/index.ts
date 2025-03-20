import { api as index } from "..";
const api = index.injectEndpoints({
  endpoints: (build) => ({
    RegisterPost: build.mutation<INSTA.RegisterRes, INSTA.RegisterReq>({
      query: (data) => ({
        url: `register${"/"}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inst"],
    }),
    LoginPost: build.mutation<INSTA.LoginRes, INSTA.LoginReq>({
      query: (data) => ({
        url: "/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["inst"],
    }),
    PostGet: build.query<INSTA.PostRes, INSTA.PostReq>({
      query: () => ({
        url: `/post`,
        method: "GET",
      }),
      providesTags: ["inst"],
    }),
  }),
});

export const {useRegisterPostMutation, useLoginPostMutation, usePostGetQuery} = api;

