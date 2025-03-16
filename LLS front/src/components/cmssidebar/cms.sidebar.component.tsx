import { HiCog, HiDocumentAdd, HiHome, HiScale, HiUserAdd } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const adminMenu = [
  {name:"Home",
  url:"/",
  icons:<HiHome/>
  },
  {
    name:"Dashboard",
    url:"/admin",
    icons:<HiCog/>
  },
  {
    name:"Team Member Management",
    url:"/admin/teammembers",
    icons: <HiUserAdd/>
  },
  {name:"Blogs Management",
    url:"/admin/blogs",
    icons: <HiDocumentAdd/>
  },
  {name:"Areas of Practice",
    url:"/admim/areas-of-practice",
    icons: <HiScale/>
  }

]


const CMSSidebar = () =>{
    return(
        <>
 <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
            {
              adminMenu.map((item:any, i:number) =>(
              <li key={i}>
                <NavLink
                to ={item.url}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg trasnsition duration-75 hover:bg-gray-100">
                    {item.icons}
                    <span className="ml-3"> {item.name}</span>
                </NavLink>
              </li>))
            }
          </ul>
        </aside>
</>
)
}

export default CMSSidebar;