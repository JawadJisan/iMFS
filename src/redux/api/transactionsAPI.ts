import { baseApi } from "./baseApi";

const transactions = "/transactions";
const notification = "/notification";

export const transactionsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTnx: builder.query({
      query: () => ({
        url: transactions,
        method: "GET",
        // params: arg,
      }),
      //   providesTags: [tagTypes.availableService],
    }),
    getNotification: builder.query({
      query: () => ({
        url: notification,
        method: "GET",
        // params: arg,
      }),
      //   providesTags: [tagTypes.availableService],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: `${transactions}/send-money`,
        method: "POST",
        data,
      }),

      // invalidatesTags: [tagTypes.availableService],
    }),
    cashIn: builder.mutation({
      query: (data) => ({
        url: `${transactions}/cash-in`,
        method: "POST",
        data,
      }),

      // invalidatesTags: [tagTypes.availableService],
    }),
    cashOut: builder.mutation({
      query: (data) => ({
        url: `${transactions}/cash-out`,
        method: "POST",
        data,
      }),

      // invalidatesTags: [tagTypes.availableService],
    }),
  }),
});

export const {
  useSendMoneyMutation,
  useGetNotificationQuery,
  useCashOutMutation,
  useCashInMutation,
  useGetAllTnxQuery,
} = transactionsAPI;
