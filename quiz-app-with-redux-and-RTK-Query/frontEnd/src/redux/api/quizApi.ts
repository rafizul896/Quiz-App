import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["quiz"],
  endpoints: (builder) => ({
    getAllQuiz: builder.query({
      query: () => "/quizzes",
      providesTags: ["quiz"],
    }),
    addQuiz: builder.mutation({
      query: (body) => (
        console.log(body),
        {
          url: "/quizzes",
          method: "POST",
          body,
        }
      ),
      invalidatesTags: ["quiz"],
    }),
  }),
});

export const { useGetAllQuizQuery, useAddQuizMutation } = quizApi;
