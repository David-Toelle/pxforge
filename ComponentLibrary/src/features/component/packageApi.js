// features/package/packageApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "./componentApi";

export const packageApi = createApi({
  reducerPath: "packageApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://pxforge.onrender.com/api/packages",
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Package"],

  endpoints: (builder) => ({
    fetchUserPackages: builder.query({
      query: () => "/",
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Package", id }))
          : [{ type: "Package", id: "LIST" }],
    }),

    fetchPackageById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Package", id }],
    }),

    createPackage: builder.mutation({
      query: (packageData) => ({
        url: "/",
        method: "POST",
        body: packageData,
      }),
      invalidatesTags: [{ type: "Package", id: "LIST" }],
    }),

    updatePackage: builder.mutation({
      query: (packageData) => ({
        url: `/${packageData.id}`,
        method: "PUT",
        body: {
          name: packageData.name,
          description: packageData.description,
          components: packageData.components,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Package", id }],
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Package", id }],
    }),

    publishPackage: builder.mutation({
      query: (id) => ({
        url: `/${id}/publish`,
        method: "POST",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Package", id }],
    }),
  }),
});

export const {
  useFetchUserPackagesQuery,
  useFetchPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  usePublishPackageMutation,
} = packageApi;
