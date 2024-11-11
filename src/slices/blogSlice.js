import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { blogEndpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";
import Swal from "sweetalert2";

const { CREATE_BLOG_API, GET_BLOGS_API, GET_PUBLISHED_BLOGS_API, GET_BLOG_BY_SLUG_API, GET_BLOG_BY_ID_API, UPDATE_BLOG_API, PUBLISH_BLOG_API, DELETE_BLOG_API } = blogEndpoints;

const initialState = {
    blogs: [],
    blog: {},
    publishedBlogs: [],
    totalPublishedBlogs: 0,
    currentPublishedPage: 1,
    isLoading: false,
    isBlogLoading: false,
    error: null,
    totalCount: 0,
    currentPage: 1,
};

export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (blogData, thunkAPI) => {
       try{
        const response = await apiConnector("POST", CREATE_BLOG_API, blogData);
        return response.data.data;
       }catch(error){
        return thunkAPI.rejectWithValue(error.response.data.message);
       }
    }
)

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async ({ page = 1, limit = 10}, thunkAPI) => {
        try {
            const response = await apiConnector(
                "GET", 
                `${GET_BLOGS_API}?page=${page}&limit=${limit}`
            );
            return response.data;  
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getPublishedBlogs = createAsyncThunk(
    "blog/getPublishedBlogs",
    async ({ page = 1, limit = 10}, thunkAPI) => {
        try {
            const response = await apiConnector("GET", `${GET_PUBLISHED_BLOGS_API}?page=${page}&limit=${limit}`);
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const getBlogBySlug = createAsyncThunk(
    "blog/getBlogBySlug",
    async (slug, thunkAPI) => {
        try{
            const response = await apiConnector("GET", `${GET_BLOG_BY_SLUG_API}/${slug}`);
            return response.data.blog;
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
            const response = await apiConnector("PUT", UPDATE_BLOG_API, blogData);
            return response.data.blog;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const publishBlog = createAsyncThunk(
    "blog/publishBlog",
    async (id, thunkAPI) => {
        try{
            const response = await apiConnector("PUT", PUBLISH_BLOG_API, {id});
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id, thunkAPI) => {
        try{
            const response = await apiConnector("DELETE", `${DELETE_BLOG_API}/${id}`);
            return response.data.blog;
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
            Swal.showLoading();
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = [...state.blogs, action.payload];
            toast.success(typeof action.payload === 'string' ? action.payload : "Blog created successfully");
            Swal.fire({
                title: 'Blog Created',
                text: 'Your blog has been created successfully',
                icon: 'success',
            });
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error((action.payload) || "Something went wrong");
            Swal.fire({
                title: 'Error',
                text: action.payload,
                icon: 'error',
            });
        })

        .addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.blogs = action.payload.blogs;
            state.totalCount = action.payload.totalCount;
            state.currentPage = action.payload.currentPage;
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getPublishedBlogs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getPublishedBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.publishedBlogs = action.payload.blogs;
            state.totalPublishedBlogs = action.payload.totalCount;
            state.currentPublishedPage = action.payload.currentPage;
        })
        .addCase(getPublishedBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(getBlogBySlug.pending, (state) => {
            state.isBlogLoading = true;
        })
        .addCase(getBlogBySlug.fulfilled, (state, action) => {
            state.isBlogLoading = false;
            state.blog = action.payload;
        })
        .addCase(getBlogBySlug.rejected, (state, action) => {
            state.isBlogLoading = false;
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
            toast.success("Blog updated successfully");
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload || "Something went wrong")
        })

        .addCase(publishBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(publishBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success((action.payload)?.message);
        })
        .addCase(publishBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error((action.payload)?.message || "Something went wrong");
        })

        .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success(action.payload || "Blog deleted successfully");
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export default blogSlice.reducer;

