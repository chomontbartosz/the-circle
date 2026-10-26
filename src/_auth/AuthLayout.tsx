import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/AuthContext";

import { ASSETS } from "../constants";
const AuthLayout = () => {
  // zalogowany użytkownik nie powinien widzieć ekranu logowania
  const { isAuthenticated } = useUserContext();

  return (
    <>
      { isAuthenticated ? (
        <Navigate to="/" />
      ): (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img 
            src={ASSETS.authSideImage}
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout