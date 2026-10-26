import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserContext } from "../../context/AuthContext";
import useSignOut from "../../hooks/useSignOut";
import { ASSETS } from "../../constants";

const Topbar = () => {
    const { user } = useUserContext();
    const signOut = useSignOut();

  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to="/" className="flex gap-3 items-center">
                <img src={ASSETS.logo} alt="The Circle Logo" width={130} />
            </Link>    

            <div className="flex gap-4">
                <Button variant="ghost" className="shad-button_ghost" onClick={signOut}>
                    <img src={ASSETS.icons.logout} alt="Log out" />
                </Button>
                <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                    <img src={user.imageUrl || ASSETS.avatarPlaceholder} alt="User Avatar" className="w-8 h-8 rounded-full" /> 
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar