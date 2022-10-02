import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";
import { IErrors } from "../../@types/errors";
import { Suggestion, SuggResponse } from "../../@types/suggestions";
import { API, URL } from "../../utils/constant";
import useAuthReq from "../../utils/hooks/useReq";
import SidebarView from "./Sidebar.view";

const initAmount = {
  suggestion: {
    value: 0,
    color: "secondary",
  },
  error: {
    value: 0,
    color: "secondary",
  },
  reportedReview: {
    value: 0,
    color: "secondary",
  },
};

export interface AmountObject {
  suggestion: {
    value: number;
    color: string;
  };
  error: {
    value: number;
    color: string;
  };
  reportedReview: {
    value: number;
    color: string;
  };
}

const header = {
  accept: "application/json",
  "Content-Type": "application/json",
};

const SidebarLogic = () => {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [amount, setAmount] = useState<AmountObject>(initAmount);
  const [cookie, setCookie] = useCookies();
  const { send } = useAuthReq("GET", "", null, header);

  const getSuggestionAmount = async () => {
    const data = (await send({
      url: `${API}${URL.GET_SUGGESTIONS}`,
    }).then((res: Response) => res.json())) as SuggResponse;
    setAmount((prev) => ({
      ...prev,
      suggestion: {
        value: data.page_info.total,
        color: data.page_info.total > 1 ? "green" : "secondary",
      },
    }));
  };
  const getErrorAmount = async () => {
    const data = (await send({
      url: `${API}${URL.ERRORS}`,
    }).then((res: Response) => res.json())) as IErrors;
    setAmount((prev) => ({
      ...prev,
      error: {
        value: data.page_info.total,
        color: data.page_info.total > 5 ? "red" : "secondary",
      },
    }));
  };
  const getReportedReviewAmount = async () => {
    const data = (await send({
      url: `${API}${URL.REPORTED_REVIEW}`,
    }).then((res: Response) => res.json())) as SuggResponse;
    setAmount((prev) => ({
      ...prev,
      reportedReview: {
        value: data.page_info.total,
        color: data.page_info.total > 5 ? "red" : "secondary",
      },
    }));
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
      amount={amount}
    />
  );
};

export default SidebarLogic;
