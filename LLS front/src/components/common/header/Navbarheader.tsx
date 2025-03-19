import { Button, Navbar } from "flowbite-react";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import { useState, useEffect } from "react";
import authSvc from "../../../pages/auth/auth.service";
export const Homeheader = () => {

  const [loggedInUser, setloggedInUser] = useState({} as any)
  const getLoggedInUser = async () => {
    try {
      const response: any = await authSvc.getRequest("/auth/me", { auth: true })
      setloggedInUser(response.result)
    } catch (exception) {
      console.log(exception)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('_at') || null;
    if (token) {
      getLoggedInUser()
    }

  }, [])

  return (
    <>
      <Navbar fluid className="bg-black h-20 sm:h-32">
        <Navbar.Brand href="https://legacylegal.com.np">
          <img src={Logo} className="h-16 w-32 sm:h-28 sm:w-64" alt="LLS Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          {
            loggedInUser ? <>
              <NavLink
                to={"/" + loggedInUser.role}
                className={({ isActive }) =>
                  `text-[15px] ${isActive ? "text-red-800" : "text-white"}`
                }
              > {loggedInUser.name} </NavLink>
            </> : <>
              <Button
                href="/signin"
                color="failure"
                style={{ width: 150, height: 45, backgroundColor: "dark red" }}
                pill
              >
                Sign In
              </Button>
            </>
          }
          <Navbar.Toggle className="text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50" />
        </div>

        <Navbar.Collapse className="decoration-white bg-black text-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/aboutus"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            ABOUT US
          </NavLink>
          <NavLink
            to="/ourteam"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            OUR TEAM
          </NavLink>
          <NavLink
            to="/areaofpractice"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            AREAS OF PRACTICE
          </NavLink>
          <NavLink
            to="/blogs"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            BLOGS
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block text-[15px] p-2 ${isActive ? "text-red-800" : "text-white"}`
            }
          >
            CONTACT
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
