import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to get the token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const componentApi = createApi({
  reducerPath: "componentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://pxforge.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Component"], // Define a tag type

  endpoints: (builder) => ({
    fetchComponents: builder.query({
      query: () => "components",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Component", id })) // Provide tags for each component
          : [{ type: "Component", id: "LIST" }], // In case there are no components
    }),

    fetchComponentById: builder.query({
      query: (id) => `components/${id}`,
      providesTags: (result, error, id) => [{ type: "Component", id }],
    }),

    createComponent: builder.mutation({
      query: (componentData) => ({
        url: "components",
        method: "POST",
        body: componentData,
      }),
      invalidatesTags: [{ type: "Component", id: "LIST" }], // Invalidate the component list to trigger a refetch
    }),

    updateComponent: builder.mutation({
      query: (componentData) => ({
        url: `components/${componentData.id}`,
        method: "PUT",
        body: componentData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Component", id }], // Invalidate the updated component
    }),

    deleteComponent: builder.mutation({
      query: (id) => ({
        url: `components/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Component", id }],
      // Invalidate the deleted component
    }),
  }),
});

export const {
  useFetchComponentsQuery,
  useFetchComponentByIdQuery,
  useCreateComponentMutation,
  useUpdateComponentMutation,
  useDeleteComponentMutation,
} = componentApi;
