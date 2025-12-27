import { baseApi } from "../../api/baseApi";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getproject: builder.query({
      query: () => ({
        method: "GET",
        url: "/projects",
      }),
      providesTags: ["project"],
    }),
    getSingleproject: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/projects/${id}`,
      }),
      providesTags: ["project"],
    }),
    createproject: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/projects`,
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    deleteprojectById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/projects/${id}`,
      }),
      invalidatesTags: ["project"],
    }),
    updateprojectById: builder.mutation({
      query: ({ id, data }) => {
        console.log("project api hitting", { id, data });
        return {
          method: "PUT",
          url: `/projects/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetprojectQuery,
  useGetSingleprojectQuery,
  useCreateprojectMutation,
  useDeleteprojectByIdMutation,
  useUpdateprojectByIdMutation,
} = projectApi;
