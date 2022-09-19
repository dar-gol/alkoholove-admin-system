import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useLogin from "../../utils/hooks/useLogin";
import LoadingModal from "../modal/LoadingModal";
import HeaderView from "./header.view";

const HeaderLogic = () => {
  const [loading, setLoading] = useState(false);
  const [night, setNight] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [cookie, setCookie] = useCookies();
  const { logout } = useLogin();

  useEffect(() => {
    setNight(cookie.mode === "dark");
  }, []);

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
  return (
    <>
      <LoadingModal
        isOpen={loading}
        title="Proszę czekać trwa wylogowywanie..."
      />
      <HeaderView
        logout={handleLogout}
        modeHandler={modeHandler}
        night={night}
        show={showPopup}
        setShow={() => setShowPopup((prev) => !prev)}
      />
    </>
  );
};

export default HeaderLogic;
