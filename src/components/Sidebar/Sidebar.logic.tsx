import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import SidebarView from "./Sidebar.view";

const SidebarLogic = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    setCollapse(cookie.collapse === "true");
  }, []);

  const collapseSidebar = () => {
    setCollapse((prev) => !prev);
    setCookie("collapse", !collapse, {
      path: "/",
      sameSite: "strict",
    });
  };

  return <SidebarView handleCollapse={collapseSidebar} collapse={collapse} />;
};

export default SidebarLogic;
