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
import AddSliders from "./pages/sliders/AddSlider";
import EditSlider from "./pages/sliders/EditSlider";
//import PrivateRoute from "./pages/PrivateRoute";
import AccessRoute from "./pages/AccessProtect";
//import Admin from "./pages/Admin";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/userManagement"
            element={<AccessRoute component={UserManagement} />}
          />
          <Route path="/addUserManagement" element={<AddUserManagement />} />
          <Route path="/editUserManagement" element={<EditUserManagement />} />
          <Route
            path="/application"
            element={<AccessRoute component={ApplicationManagement} />}
          />
          <Route path="/addUserApplication" element={<AddUserApplication />} />
          <Route path="/editApplication" element={<EditApplication />} />
          <Route path="/userView" element={<UserView />} />
          <Route
            path="/company"
            element={<AccessRoute component={CompanyManagement} />}
          />
          <Route path="/editCompany" element={<EditCompany />} />
          <Route path="/addNewCompany" element={<AddNewCompany />} />
          <Route
            path="/designation"
            element={<AccessRoute component={DesignationManagement} />}
          />
          <Route path="/addDesignation" element={<AddDesignation />} />
          <Route path="/editDesignation" element={<EditDesignation />} />
          <Route
            path="/salary"
            element={<AccessRoute component={SalaryManagement} />}
          />
          <Route path="/addNewSalary" element={<AddNewSalary />} />
          <Route path="/editSalary" element={<EditSalary />} />
          <Route path="/page" element={<PageManagement />} />
          <Route path="/addNewPage" element={<AddNewPage />} />
          <Route path="/editPage" element={<EditPage />} />
          <Route
            path="/slider"
            element={<AccessRoute component={SliderManagement} />}
          />
          <Route path="/addSliders" element={<AddSliders />} />
          <Route path="/editSlider" element={<EditSlider />} />
          <Route
            path="/profile"
            element={<AccessRoute component={Profile} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
