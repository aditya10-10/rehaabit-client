import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { blogEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { CREATE_BLOG_API, GET_BLOGS_API, GET_BLOG_BY_SLUG_API, GET_BLOG_BY_ID_API, UPDATE_BLOG_API, PUBLISH_BLOG_API, DELETE_BLOG_API } = blogEndpoints;

const initialState = {
    blogs: [],
    blog: {},
    isLoading: false,
    error: null,
};

export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (blogData, thunkAPI) => {
       try{
        const response = await apiConnector("POST", CREATE_BLOG_API, blogData,
        {"Content-Type": "application/json"},
        {token: localStorage.getItem("token")}
        );
        return response.data.data;
       }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message);
       }
    }
)

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async (_, thunkAPI) => {
        try{
            const response = await apiConnector("GET", GET_BLOGS_API);
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getBlogBySlug = createAsyncThunk(
    "blog/getBlogBySlug",
    async (slug, thunkAPI) => {
        try{
            const response = await apiConnector("GET", GET_BLOG_BY_SLUG_API, slug);
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)


export const getBlogById = createAsyncThunk(
    "blog/getBlogById",
    async (id, thunkAPI) => {
        try{
            const response = await apiConnector("GET", GET_BLOG_BY_ID_API, id);
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async (blogData, thunkAPI) => {
        try{
            const response = await apiConnector("PUT", UPDATE_BLOG_API, blogData, {"Content-Type": "application/json"}, {token: localStorage.getItem("token")});
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const publishBlog = createAsyncThunk(
    "blog/publishBlog",
    async (id, thunkAPI) => {
        try{
            const response = await apiConnector("PUT", PUBLISH_BLOG_API, id, {"Content-Type": "application/json"}, {token: localStorage.getItem("token")});
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id, thunkAPI) => {
        try{
            const response = await apiConnector("DELETE", DELETE_BLOG_API, id, {"Content-Type": "application/json"}, {token: localStorage.getItem("token")});
            return response.data.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = [...state.blogs, action.payload];
            toast.success(action.payload.message || "Blog created successfully");
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload;
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getBlogBySlug.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogBySlug.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blog = action.payload;
        })
        .addCase(getBlogBySlug.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getBlogById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blog = action.payload;
        })
        .addCase(getBlogById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(updateBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedBlogs = state.blogs.map((blog) => blog.id === action.payload.id ? action.payload : blog);
            state.blogs = [...updatedBlogs];
            toast.success(action.payload.message || "Blog updated successfully");
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(publishBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(publishBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success(action.payload.message || "Blog published successfully");
        })
        .addCase(publishBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success(action.payload.message || "Blog deleted successfully");
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

