import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IRepoState } from "../utils";
import RepoServices from "../services";
import { IPageData } from "@/utils/interface";

const initialState: IRepoState = {
  userInfo: {
    name: "",
    avatar_url: "",
    bio: "",
    blog: "",
    company: "",
    followers: 0,
    followers_url: "",
    following: 0,
    following_url: "",
    hireable: false,
    id: 0,
    location: "",
    public_repos: 0,
    login: "",
    repos_url: "",
    starred_url: "",
    twitter_username: null,
    url: "",
    isLoading: false,
  },
  repoInfo: {
    topics: [],
    language: "",
    url: "",
    downloads_url: "",
    forks_count: 0,
    html_url: "",
    id: 0,
    name: "",
    description: "",
    open_issues_count: 0,
    stargazers_count: 0,
    default_branch: "",
    isLoading: false,
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 6,
    isLoading: false,
  },
  preferredTheme: "dark",
}

// fetching user data
export const getUser = createAsyncThunk("getUser", async (username?: string) => {
  try {

    if (username) {
      const res: AxiosResponse = await RepoServices.getUserInfo(username)
      return res.data;
    }
    else {
      let username = "DSDmark";
      const res: AxiosResponse = await RepoServices.getUserInfo(username);
      return res.data;
    }
  } catch (err) {
    console.log(err)
    let username = "DSDmark";
    const res: AxiosResponse = await RepoServices.getUserInfo(username);
    return res.data;
  }
})

export const getRepoInfo = createAsyncThunk("getRepoInfo", async (params: IPageData) => {
  let res: AxiosResponse;
  try {
    if (params.username) {
      res = await RepoServices.getRepo(params)
      return res.data;

    } else {
      params.username = "DSDmark";
      res = await RepoServices.getRepo(params)
      return res.data;
    }
  } catch (err) {
    params.username = "DSDmark"
    res = await RepoServices.getRepo(params);
    return res.data;
  }
})

export const getFollowerInfo = createAsyncThunk("getFollowerInfo", async (params: IPageData) => {
  let res: AxiosResponse;
  try {
    if (params.username) {
      res = await RepoServices.getFollowers(params)
      return res.data;

    } else {
      params.username = "DSDmark";
      res = await RepoServices.getFollowers(params)
      return res.data;
    }
  } catch (err) {
    params.username = "DSDmark"
    res = await RepoServices.getFollowers(params);
    return res.data;
  }
})

export const getFollowingInfo = createAsyncThunk("getFollowingInfo", async (params: IPageData) => {
  let res: AxiosResponse;
  try {
    if (params.username) {
      res = await RepoServices.getFollowing(params)
      return res.data;

    } else {
      params.username = "DSDmark";
      res = await RepoServices.getFollowing(params)
      return res.data;
    }
  } catch (err) {
    params.username = "DSDmark"
    res = await RepoServices.getFollowing(params);
    return res.data;
  }
})

export const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.preferredTheme = action.payload;
    },
    setPageValue: (state, action) => {
      state.pagination.itemsPerPage = action.payload.perPage
      state.pagination.currentPage = action.payload.page
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      return {
        ...state, userInfo: { ...action.payload, isLoading: true }
      }
    }),
      builder.addCase(getUser.pending, (state) => {
        state.userInfo.isLoading = false;
      }),
      builder.addCase(getUser.rejected, (state) => {
        state.userInfo.isLoading = false;
      }),
      builder.addCase(getRepoInfo.fulfilled, (state, action) => {
        return { ...state, repoInfo: { ...action.payload, isLoading: true } }
      }),
      builder.addCase(getRepoInfo.pending, (state) => {
        state.repoInfo.isLoading = false;
      }),
      builder.addCase(getRepoInfo.rejected, (state) => {
        state.repoInfo.isLoading = false;
      })
  }
})


export const { setTheme, setPageValue } = repoSlice.actions

export default repoSlice.reducer

