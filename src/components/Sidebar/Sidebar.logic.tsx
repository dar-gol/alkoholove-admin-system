import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { IErrors } from "../../@types/errors";
import { Suggestion, SuggResponse } from "../../@types/suggestions";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import SidebarView from "./Sidebar.view";
import {
  SettingsContext,
  SettingsContextType,
} from "../../context/settingsContext";

const header = {
  accept: "application/json",
  "Content-Type": "application/json",
};

const SidebarLogic = () => {
  const {
    listInfo,
    setSuggestionAmount,
    setErrorAmount,
    setReportedReviewAmount,
  } = useContext(SettingsContext) as SettingsContextType;
  const [collapse, setCollapse] = useState<boolean>(false);
  const [cookie, setCookie] = useCookies();
  const { send } = useAuthReq("GET", "", null, header);

  const getSuggestionAmount = async () => {
    const data = (await send({
      url: `${API}${URL.GET_SUGGESTIONS}`,
    }).then((res: Response) => res.json())) as SuggResponse;
    setSuggestionAmount(data.page_info.total);
  };
  const getErrorAmount = async () => {
    const data = (await send({
      url: `${API}${URL.ERRORS}`,
    }).then((res: Response) => res.json())) as IErrors;
    setErrorAmount(data.page_info.total);
  };
  const getReportedReviewAmount = async () => {
    const data = (await send({
      url: `${API}${URL.REPORTED_REVIEW}`,
    }).then((res: Response) => res.json())) as SuggResponse;
    setReportedReviewAmount(data.page_info.total);
  };

  const prepAmount = async () => {
    await getSuggestionAmount();
    await getErrorAmount();
    await getReportedReviewAmount();
  };

  useEffect(() => {
    prepAmount();
    setCollapse(cookie.collapse === "true");
  }, []);

  const collapseSidebar = () => {
    setCollapse((prev) => !prev);
    setCookie("collapse", !collapse, {
      path: "/",
      sameSite: "strict",
    });
  };
  return (
    <SidebarView
      handleCollapse={collapseSidebar}
      collapse={collapse}
      amount={listInfo}
    />
  );
};

export default SidebarLogic;
