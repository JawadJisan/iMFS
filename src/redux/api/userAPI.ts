import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const USERS = "/users";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    users: build.query({
      query: (arg: Record<string, any>) => ({
        url: USERS,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: any) => {
        return {
          users: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.users],
    }),

    addUser: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        data,
      }),
      //   invalidatesTags: [tagTypes.user],
    }),

    // get single by id
    user: build.query({
      query: (email) => ({
        url: `${USERS}/${email}`,
        method: "GET",
      }),
      //   providesTags: [tagTypes.user],
    }),

    // update single by id
    updateUser: build.mutation({
      query: ({ id, data }) => ({
        // console.log(id, data),
        url: `${USERS}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),

    // delete single by id
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${USERS}/${id}`,
        method: "DELETE",
      }),
      //   invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUsersQuery,
  useUserQuery,
  useAddUserMutation,
} = usersApi;
