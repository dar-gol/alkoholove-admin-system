import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { NAME_PATH } from "../../utils/constant";
import useLogin from "../../utils/hooks/useLogin";
import LoadingModal from "../modal/LoadingModal";
import HeaderView from "./header.view";

const HeaderLogic = () => {
  const [loading, setLoading] = useState(false);
  const [night, setNight] = useState(false);
  const [isContrast, setIsContrast] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const [cookie, setCookie] = useCookies();
  const { logout } = useLogin();

  useEffect(() => {
    setNight(cookie.mode === "dark");
  }, []);

  const getTitle = () => {
    const name = location.pathname.split("/")[1];
    const fromNamePath = NAME_PATH[name as keyof typeof NAME_PATH];

    return fromNamePath || name;
  };

  const handleLogout = () => {
    setLoading(true);
    logout();
  };

  const modeHandler = () => {
    setNight((prev) => !prev);
    setCookie("mode", night ? "light" : "dark", {
      path: "/",
      sameSite: "strict",
    });
  };

  const contrastModeHandler = () => {
    setIsContrast((prev) => !prev);
    setCookie("isHighContrast", isContrast ? "true" : "false", {
      path: "/",
      sameSite: "strict",
    });
  };

  return (
    <>
      <LoadingModal
        isOpen={loading}
        title="Proszę czekać trwa wylogowywanie..."
      />
      <HeaderView
        logout={handleLogout}
        modeHandler={modeHandler}
        contrastModeHandler={contrastModeHandler}
        night={night}
        isContrast={isContrast}
        show={showPopup}
        setShow={() => setShowPopup((prev) => !prev)}
        getTitle={getTitle}
      />
    </>
  );
};

export default HeaderLogic;
