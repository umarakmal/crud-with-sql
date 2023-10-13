import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
// import PrivateRoute from "./component/auth/PrivateRoute";
import PageNotFound from "./PageNotFound";
import UploadData from "./components/UploadData";
// import Datatable from "./components/Datatable";
import { AppLoader } from "./components/AppLoader";
import Report from "./components/Report";
import UserManage from "./components/userManagement/UserManagement";
const Datatable = lazy(() => import("./components/Datatable"));

function Routees() {

  return (
    <Suspense fallback={<AppLoader />} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/datatable" element={<Datatable />} />
          <Route path="/user-manage" element={<UserManage />} />
          <Route path="/upload" element={<UploadData />} />
          <Route path="/report" element={<Report />} />
          {/* <Route element={<PrivateRoute />}>
            <Route
              path="/request-form"
              element={
                <AppLogout>
                  <HelpForm />
                </AppLogout>
              }
            />
          </Route> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Routees;
