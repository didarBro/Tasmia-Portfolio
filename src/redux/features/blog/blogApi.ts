import { baseApi } from "../../api/baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getblog: builder.query({
      query: () => ({
        method: "GET",
        url: "/blogs",
      }),
      providesTags: ["blog"],
    }),
    getSingleblog: builder.query({
      query: (id) => {
        console.log("blog api hitting", id);
        return {
          method: "GET",
          url: `/blogs/${id}`,
        };
      },
      providesTags: ["blog"],
    }),
    createblog: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/blogs`,
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    deleteblogById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/blogs/${id}`,
      }),
      invalidatesTags: ["blog"],
    }),
    updateblogById: builder.mutation({
      query: ({ id, data }) => {
        console.log("blog api hitting", { id, data });
        return {
          method: "PUT",
          url: `/blogs/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetblogQuery,
  useGetSingleblogQuery,
  useCreateblogMutation,
  useDeleteblogByIdMutation,
  useUpdateblogByIdMutation,
} = blogApi;
