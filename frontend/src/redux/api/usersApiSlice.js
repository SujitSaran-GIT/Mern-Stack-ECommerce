
import { apiSlice } from './apiSlice'
import { USERS_URL } from '../features/constants'

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) =>({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            })
        })
    })
})

// `use${Login}Mutation`

export const {useLoginMutation} = userApiSlice