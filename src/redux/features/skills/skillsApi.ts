import { baseApi } from "../../api/baseApi";

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        method: "GET",
        url: "/skills",
      }),
      providesTags: ["skills"],
    }),
    getSingleSkills: builder.query({
      query: (id) => ({
        method: "GET",
        url: `/skills/${id}`,
      }),
      providesTags: ["skills"],
    }),
    createSkills: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: `/skills`,
        body: data,
      }),
      invalidatesTags: ["skills"],
    }),
    deleteSkillsById: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/skills/${id}`,
      }),
      invalidatesTags: ["skills"],
    }),
    updateSkillsById: builder.mutation({
      query: ({ id, data }) => {
        console.log("skills api hitting", { id, data });
        return {
          method: "PUT",
          url: `/skills/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useGetSingleSkillsQuery,
  useCreateSkillsMutation,
  useDeleteSkillsByIdMutation,
  useUpdateSkillsByIdMutation,
} = skillsApi;
