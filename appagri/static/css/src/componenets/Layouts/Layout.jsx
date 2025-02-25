import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Subheader from "./Subheader/Subheader";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isDesktop;
};

const Layout = ({ children }) => {
    const isDesktop = useIsDesktop();

  return (
    <div className="flex flex-col">
      <Header />
        {!isDesktop && <Subheader />}
      <div className="">
          {children || <Outlet />}
      </div>

      <div className="bottom-0">
         <Footer />
      </div>
    </div>
  );
};

export default Layout;
