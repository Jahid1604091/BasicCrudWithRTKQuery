import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos'
        }),
        addTodo: builder.mutation({
            query: todo => ({
                url: '/todos',
                method: "POST",
                body: todo
            })
        }),
        updateTodo: builder.mutation({
            query: todo => ({
                url: `/todos/${todo.id}`,
                method: "PATCH",
                body: todo
            })
        }),

        deleteTodo: builder.mutation({
            query: id => ({
                url: `/todos/${id}`,
                method: "DELETE",
            })
        }),

    })

})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,

} = apiSlice;