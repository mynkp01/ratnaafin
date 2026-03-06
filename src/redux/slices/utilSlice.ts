import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  showFloatingForm: false,
  showRequestCallbackForm: false,
  youTubeIFrame: {
    show: false,
    video: null,
  },
  selectedLoan: {
    loanName: "",
    loanAmount: "",
  },
  screen: {
    isXS: false,
    isSM: false,
    isMD: false,
    isLG: false,
    isXL: false,
    is2XL: false,
  },
  thankYouModal: {
    open: false,
    formType: "",
    url: "",
  },
  latestBlogs: [],
};

const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setShowFloatingForm: (state, { payload }) => {
      state.showFloatingForm = payload;
    },
    setShowRequestCallbackForm: (state, { payload }) => {
      state.showRequestCallbackForm = payload;
    },
    setShowYouTubeIFrame: (state, { payload }) => {
      state.youTubeIFrame = payload;
    },
    setSelectedLoan: (state, { payload }) => {
      state.selectedLoan = payload;
    },
    setScreen: (state, { payload }) => {
      state.screen = payload;
    },
    setThankYouModal: (state, { payload }) => {
      state.thankYouModal = payload;
    },
    setLatestBlogs: (state, { payload }) => {
      state.latestBlogs = payload;
    },
  },
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectShowFloatingForm: (state) => state.showFloatingForm,
    selectShowRequestCallbackForm: (state) => state.showRequestCallbackForm,
    selectShowYouTubeIFrame: (state) => state.youTubeIFrame,
    selectSelectedLoan: (state) => state.selectedLoan,
    selectScreen: (state) => state.screen,
    selectThankYouModal: (state) => state.thankYouModal,
    selectLatestBlogs: (state) => state.latestBlogs,
  },
});

export const {
  setIsLoading,
  setShowFloatingForm,
  setShowRequestCallbackForm,
  setShowYouTubeIFrame,
  setSelectedLoan,
  setScreen,
  setThankYouModal,
  setLatestBlogs,
} = utilSlice.actions;

export const {
  selectIsLoading,
  selectShowFloatingForm,
  selectShowRequestCallbackForm,
  selectShowYouTubeIFrame,
  selectSelectedLoan,
  selectScreen,
  selectThankYouModal,
  selectLatestBlogs,
} = utilSlice.selectors;

export default utilSlice.reducer;
