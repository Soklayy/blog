import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IBlog } from '../../api/models/blog.interface'
import { IUser } from '../../api/models/user.interface'

const initialState: { data: IBlog[] } = {
    data: []
}

export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<IUser[]>) => {
            state.data = action.payload
        },
    }
})

export const { setBlogs } = blogSlice.actions

export default blogSlice.reducer