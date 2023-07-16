import { api } from "@/redux/api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (token) => ({
        url: "/books",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.data.map(
                ({ id }: { id: string }) => ({ type: "Books", id } as const)
              ),
              { type: "Books", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Books', id: 'LIST' }` is invalidated
            [{ type: "Books", id: "LIST" }],
    }),
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),
    addBook: builder.mutation({
      query: ({ book, token }) => ({
        url: "/books",
        method: "POST",
        body: book,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, book, token }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: {
          book,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),

      invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
    }),
    deleteBook: builder.mutation({
      query: ({ id, token }) => ({
        url: `/books/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Books", id }],
    }),
    filterBooks: builder.query({
      query: (filter) => ({
        url: "/books/filter",
        params: filter,
      }),
    }),

    searchBooks: builder.query({
      query: (search) => ({
        url: "/books/search",
        params: search,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useFilterBooksQuery,
  useSearchBooksQuery,
} = booksApi;

export default booksApi;
