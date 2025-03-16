import { Route, Routes } from "react-router-dom";
import Layout from "../layout/layout";
import Landingpage from "../pages/landing";
import Ourteam from "../pages/Our Team";
import Areasofpractice from "../pages/Areasofpractice";
import Signin from "../pages/signin/signin";
import Contact from "../pages/contactpage";
import Aboutuspage from "../pages/About Us";
import {BlogsCreatePage, Blogslistingpage} from "../pages/blogs/index";
import { useEffect, useState } from "react";
import AuthContext from "../context/auth.context";
import authSvc from "../pages/auth/auth.service";
import AdminLayout from "../layout/cms.page";
import { AdminDashboard } from "../pages/dashboard";
import CheckPermission from "./rbac.config";
import LoadingComponent from "../components/common/loading/loading.component";
import Errorpage from "../components/common/error/notfounderror";
import {BlogsComponent} from "../../src/components/blogs/index";
import TeamCreatePage from "../pages/Our Team/team-create";
import TeamListPage from "../pages/Our Team/team-list.page";

export const Routerconfig = () => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getLoggedInUser = async () => {
    try {
      const response: any = await authSvc.getRequest('/auth/me', { auth: true });
      console.log("User data fetched:", response.result); // Debug log
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
      getLoggedInUser(); // Get logged-in user data if token exists
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
              <Route path="/" element={<Landingpage />} />
              <Route path="/aboutus" element={<Aboutuspage />} />
              <Route path="/ourteam" element={<Ourteam />} />
              <Route path="/areaofpractice" element={<Areasofpractice />} />
              <Route path="/blogs" element={<BlogsComponent />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Errorpage url="/" label="Go To Home" />} />
            </Route>
            <Route path="/signin" element={<Signin />} />
            </Routes>


            <Routes>
            <Route path="/admin" element={<CheckPermission allowedBy="admin" children={<AdminLayout />} />} >
              <Route index element={<AdminDashboard />} />
              <Route path="*" element={<Errorpage url="/admin" label="Go To Dashboard" />} />
              <Route path="blogs" element={<Blogslistingpage/>}/>
              <Route path="blogs/create" element={<BlogsCreatePage/>}/>

              <Route path="/admin/team" element={<TeamListPage />} />
              <Route path="/admin/team/create" element={<TeamCreatePage />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      )}
    </>
  );
};

export default Routerconfig;
