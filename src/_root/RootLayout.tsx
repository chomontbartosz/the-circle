import LeftSidebar from "../components/shared/LeftSidebar";
import Topbar from "../components/shared/Topbar";
import BottomBar from "../components/shared/BottomBar";
import RightSidebar from "../components/shared/RightSidebar";

import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />
      
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <RightSidebar />

      <BottomBar />
    </div>
  )
}

export default RootLayout