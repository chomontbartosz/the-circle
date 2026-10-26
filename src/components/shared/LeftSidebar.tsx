import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "../../context/AuthContext";
import useSignOut from "../../hooks/useSignOut";
import { ASSETS, sidebarLinks } from "../../constants";

const LeftSidebar = () => {
    const { pathname } = useLocation();
    const { user } = useUserContext();
    const signOut = useSignOut();

  return (
    <nav className="leftsidebar">
        <div className="flex flex-col gap-20">
            <Link to="/" className="flex gap-3 items-center">
                <img src={ASSETS.logo} alt="The Circle Logo" width={130} />
            </Link>   
            <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                <img src={user.imageUrl || ASSETS.avatarPlaceholder} alt="User Avatar" className="w-14 h-14 rounded-full" /> 
                <div className="flex flex-col">
                    <p className="body-bold">
                        {user.name}
                    </p>
                    <p className="small-regular text-light-3">
                        @{user.username}
                    </p>
                </div>
            </Link> 

            <ul className="flex flex-col gap-6">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.route;

                    return (
                        <li key={link.label } className={`leftsidebar-link group
                            ${isActive && 'bg-primary-500'}
                        `}>
                        <NavLink
                            to={link.route}    
                            className="flex gap-4 items-center p-4"    
                        >
                            <link.icon
                                className={`transition-colors ${isActive ? 'text-light-1' : 'text-primary-500'} group-hover:text-light-1`}
                            />
                            {link.label}
                        </NavLink>
                        </li>
                    )
                })}
            </ul>

            <Button variant="ghost" className="shad-button_ghost flex gap-4" onClick={signOut}>
            <img src={ASSETS.icons.logout} alt="Log out" />
            <p className="small-medium lg:base-medium">Log out</p>
        </Button>
        </div>
    </nav>
  )
}

export default LeftSidebar