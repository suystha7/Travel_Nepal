import { IApiResponse } from "@/interface/apiResponse";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import qs from "qs";

interface IGetDataArgs {
  url: string;
  params?: Record<string, string | number | boolean | string[]>;
  tag?: string;
}

type InitialPageParam = {
  page: number;
  size: number;
};

interface IPostDataArgs {
  url: string;
  data?: any;
  options?: any;
  invalidateTag?: string | string[];
}
interface IUpdateDataArgs {
  url: string;
  data: any;
  options?: any;
  invalidateTag?: string;
}
interface IDeleteDataArgs {
  url: string;
  body?: any;
  options?: any;
  invalidateTag?: string;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    let token = null;

    if (typeof window !== "undefined") {
      const session = await getSession();
      token = session?.accessToken ?? sessionStorage.getItem("access_token");
    } else {
      token = process.env.INTERNAL_BUILD_TOKEN;
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    if (!headers.has("Content-Type")) {
      headers.set("Accept", "application/json");
    }

    return headers;
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat", encode: true });
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Data"],
  endpoints: (builder) => ({
    getData: builder.query<any, IGetDataArgs>({
      query: ({ url, params }) => ({
        url,
        method: "GET",
        params,
      }),
      providesTags: (_, __, { tag }) =>
        tag ? [{ type: "Data", id: tag }] : [],
    }),

    postData: builder.mutation<any, IPostDataArgs>({
      query: ({ url, data, options }) => ({
        url,
        method: "POST",
        body: data,
        ...options,
      }),
      invalidatesTags: (_, __, { invalidateTag }) => {
        if (Array.isArray(invalidateTag)) {
          return invalidateTag.map((tag) => ({ type: "Data", id: tag }));
        } else if (invalidateTag) {
          return [{ type: "Data", id: invalidateTag }];
        }
        return [];
      },
    }),

    updateData: builder.mutation<any, IUpdateDataArgs>({
      query: ({ url, data }) => ({
        url,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag ? [{ type: "Data", id: invalidateTag }] : [],
    }),

    deleteData: builder.mutation<any, IDeleteDataArgs>({
      query: ({ url, body }) => ({
        url,
        method: "DELETE",
        body,
      }),
      invalidatesTags: (_, __, { invalidateTag }) =>
        invalidateTag ? [{ type: "Data", id: invalidateTag }] : [],
    }),

    getAllData: builder.infiniteQuery<
      IApiResponse<any>,
      IGetDataArgs,
      InitialPageParam
    >({
      query: ({ pageParam: { page, size }, queryArg: { url, params } }) => ({
        url,
        method: "GET",
        params: { ...params, p: page, page_size: size },
      }),
      providesTags: (_, __, { tag }) =>
        tag ? [{ type: "Data", id: tag }] : [],
      infiniteQueryOptions: {
        initialPageParam: {
          page: 1,
          size: 18,
        },
        getNextPageParam: (lastPage) => {
          const pageData = lastPage?.data;
          if (pageData?.hasNext) {
            return {
              page: pageData.currentPage + 1,
              size: pageData.perPage,
            };
          }
          return undefined;
        },
        getPreviousPageParam: (lastPage) => {
          const pageData = lastPage?.data;
          if (pageData?.hasPrevious) {
            return {
              page: pageData.currentPage - 1,
              size: pageData.perPage,
            };
          }
          return undefined;
        },
      },
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  useUpdateDataMutation,
  useDeleteDataMutation,
  useLazyGetDataQuery,
  useGetAllDataInfiniteQuery,
} = apiSlice;
