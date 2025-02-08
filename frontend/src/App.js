import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./components/app";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
//import Error from "./pages/Error";

import UserManagement from "./pages/userManagement/UserManagement";
import AddUserManagement from "./pages/userManagement/AddUserManagement";
import EditUserManagement from "./pages/userManagement/EditUserManagement";
import ApplicationManagement from "./pages/applications/ApplicationManagement";
import AddUserApplication from "./pages/applications/AddUserApplication";
import EditApplication from "./pages/applications/EditApplication";
import UserView from "./pages/applications/UserView";
import CompanyManagement from "./pages/companyManagements/CompanyManagement";
import EditCompany from "./pages/companyManagements/EditCompany";
import AddNewCompany from "./pages/companyManagements/AddNewCompany";
import DesignationManagement from "./pages/designations/DesignationManagement";
import EditDesignation from "./pages/designations/EditDesignation";
import AddDesignation from "./pages/designations/AddDesignation";
import SalaryManagement from "./pages/salary/SalaryManagement";
import AddNewSalary from "./pages/salary/AddNewSalary";
import EditSalary from "./pages/salary/EditSalary";
import PageManagement from "./pages/page/PageManagement";
import AddNewPage from "./pages/page/AddNewPage";
import EditPage from "./pages/page/EditPage";
import SliderManagement from "./pages/sliders/SliderManagement";
import EditSlider from "./pages/sliders/EditSlider";
import PrivateRoute from "./pages/PrivateRoute";
import AddSlider from "./pages/sliders/AddSlider";
import VisaEnquiry from "./pages/VisaEnquiry";
import ViewOne from "./pages/applications/ViewOne";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/userManagement"
            element={
              <PrivateRoute>
                <UserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addUserManagement"
            element={
              <PrivateRoute>
                <AddUserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/editUserManagement"
            element={
              <PrivateRoute>
                <EditUserManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/application"
            element={
              <PrivateRoute>
                <ApplicationManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addUserApplication"
            element={
              <PrivateRoute>
                <AddUserApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/editApplication"
            element={
              <PrivateRoute>
                <EditApplication />
              </PrivateRoute>
            }
          />
          <Route
            path="/userView"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/updateApplicationView/:id"
            element={
              <PrivateRoute>
                <UserView />
              </PrivateRoute>
            }
          />
          <Route
            path="/company"
            element={
              <PrivateRoute>
                <CompanyManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/editCompany"
            element={
              <PrivateRoute>
                <EditCompany />
              </PrivateRoute>
            }
          />
          <Route
            path="/addCompany"
            element={
              <PrivateRoute>
                <AddNewCompany />
              </PrivateRoute>
            }
          />
          <Route
            path="/designation"
            element={
              <PrivateRoute>
                <DesignationManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addDesignation"
            element={
              <PrivateRoute>
                <AddDesignation />
              </PrivateRoute>
            }
          />
          <Route
            path="/editDesignation"
            element={
              <PrivateRoute>
                <EditDesignation />
              </PrivateRoute>
            }
          />
          <Route
            path="/salary"
            element={
              <PrivateRoute>
                <SalaryManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addNewSalary"
            element={
              <PrivateRoute>
                <AddNewSalary />
              </PrivateRoute>
            }
          />
          <Route
            path="/editSalary"
            element={
              <PrivateRoute>
                <EditSalary />
              </PrivateRoute>
            }
          />
          <Route
            path="/page"
            element={
              <PrivateRoute>
                <PageManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addNewPage"
            element={
              <PrivateRoute>
                <AddNewPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/editPage"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/slider"
            element={
              <PrivateRoute>
                <SliderManagement />
              </PrivateRoute>
            }
          />
          <Route
            path="/addSliders"
            element={
              <PrivateRoute>
                <AddSlider />
              </PrivateRoute>
            }
          />
          <Route
            path="/editSlider"
            element={
              <PrivateRoute>
                <EditSlider />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/enquiry"
            element={
              <PrivateRoute>
                <VisaEnquiry />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-one"
            element={
              <PrivateRoute>
                <ViewOne />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
