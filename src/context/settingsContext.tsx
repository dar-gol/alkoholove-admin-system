import React, { ReactNode } from "react";

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

export type SettingsContextType = {
  listInfo: AmountObject;
  setSuggestionAmount: (amount: number) => void;
  setErrorAmount: (amount: number) => void;
  setReportedReviewAmount: (amount: number) => void;
};

export const SettingsContext = React.createContext<SettingsContextType | null>(
  null
);

const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listInfo, setListInfo] = React.useState<AmountObject>(initAmount);

  const setSuggestionAmount = (amount: number) => {
    setListInfo((prev) => ({
      ...prev,
      suggestion: {
        value: amount || 0,
        color: amount >= 1 ? "green" : "secondary",
      },
    }));
  };

  const setErrorAmount = (amount: number) => {
    setListInfo((prev) => ({
      ...prev,
      error: {
        value: amount || 0,
        color: amount >= 5 ? "red" : "secondary",
      },
    }));
  };

  const setReportedReviewAmount = (amount: number) => {
    setListInfo((prev) => ({
      ...prev,
      reportedReview: {
        value: amount || 0,
        color: amount >= 5 ? "red" : "secondary",
      },
    }));
  };

  return (
    <SettingsContext.Provider
      value={{
        listInfo,
        setSuggestionAmount,
        setErrorAmount,
        setReportedReviewAmount,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
