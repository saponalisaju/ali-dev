import { configureStore } from "@reduxjs/toolkit";

import designationsReducer from "../pages/designations/DesignationSlice";
import companyReducer from "../pages/companyManagements/companySlice";
import pageReducer from "../pages/page/pageSlice";
import salaryReducer from "../pages/salary/salarySlice";
import slidersReducer from "../pages/sliders/sliderSlice";

const store = configureStore({
  reducer: {
    designations: designationsReducer,
    company: companyReducer,
    page: pageReducer,
    salary: salaryReducer,
    slider: slidersReducer,
  },
});

export default store;
