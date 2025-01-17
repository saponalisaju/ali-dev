import { configureStore } from "@reduxjs/toolkit";

import userManagementReducer from "../pages/userManagement/userManagementSlice";
import designationsReducer from "../pages/designations/DesignationSlice";
import companyReducer from "../pages/companyManagements/companySlice";
import pageReducer from "../pages/page/pageSlice";
import profileReducer from "../pages/profile/profileSlice";
import salaryReducer from "../pages/salary/salarySlice";
import slidersReducer from "../pages/sliders/sliderSlice";
// import authReducer from "../redux/reducer";
import applicationReducer from "../pages/applications/applicationSlice";

const store = configureStore({
  reducer: {
    // auth: authReducer,

    userManagement: userManagementReducer,
    designations: designationsReducer,
    company: companyReducer,
    page: pageReducer,
    profile: profileReducer,
    salary: salaryReducer,
    slider: slidersReducer,
    applications: applicationReducer,
  },
});

export default store;
