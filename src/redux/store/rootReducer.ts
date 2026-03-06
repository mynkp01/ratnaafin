import authSlice from "@/redux/slices/authSlice";
import utilSlice from "@/redux/slices/utilSlice";

const rootReducer = {
  util: utilSlice,
  auth: authSlice,
};

export default rootReducer;
