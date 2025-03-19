import { Route, Routes } from "react-router-dom";
import Layout from "../layout/layout";
import Landingpage from "../pages/landing";
import {Signin, ForgotPassword} from "../pages/signin/signin";
import Contact from "../pages/contactpage";
import Aboutuspage from "../pages/About Us";
import { BlogsCreatePage, Blogslistingpage, BlogsEditPage } from "../pages/blogs/index";
import { useEffect, useState } from "react";
import AuthContext from "../context/auth.context";
import authSvc from "../pages/auth/auth.service";
import AdminLayout from "../layout/cms.page";
import { AdminDashboard } from "../pages/dashboard";
import CheckPermission from "./rbac.config";
import LoadingComponent from "../components/common/loading/loading.component";
import Errorpage from "../components/common/error/notfounderror";
import { BlogsComponentforPage } from "../../src/components/blogs/index";
import { TeamCreatePage, TeamEditPage, TeamListingPage } from "../pages/Our Team/exporting";
import Areasofpracticecomponent from "../components/practice/aop";
import BlogPage from "../pages/blogs/blogspage";
import TeamSection from "../pages/Our Team";
import ResetPassword from "../pages/signin/reset-password.page";

export const Routerconfig = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getLoggedInUser = async () => {
    try {
      const response = await authSvc.getRequest('/auth/me', { auth: true });
      console.log("User data fetched:", response.result);
      setLoggedInUser(response.result);
    } catch (exception) {
      console.log("Error fetching user:", exception);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("_at");
    if (token) {
      getLoggedInUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Landingpage />} />
              <Route path="/aboutus" element={<Aboutuspage />} />
              <Route path="/ourteam" element={<TeamSection />} />
              <Route path="/areaofpractice" element={<Areasofpracticecomponent />} />
              <Route path="/blogs" element={<BlogPage />} />
              <Route path="/blogs/:id" element={<BlogsComponentforPage/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Errorpage url="/" label="Go To Home" />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/signin" element={<Signin />} />

            <Route path="/admin" element={<CheckPermission allowedBy="admin" children={<AdminLayout />} />}>
              <Route index element={<AdminDashboard />} />
              <Route path="*" element={<Errorpage url="/admin" label="Go To Dashboard" />} />
              <Route path="blogs" element={<Blogslistingpage />} />
              <Route path="blogs/create" element={<BlogsCreatePage />} />
              <Route path="blogs/:id/edit" element={<BlogsEditPage />} />

              <Route path="team" element={<TeamListingPage />} />
              <Route path="team/create" element={<TeamCreatePage />} />
              <Route path="team/:id/edit" element={<TeamEditPage />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      )}
    </>
  );
};

export default Routerconfig;
