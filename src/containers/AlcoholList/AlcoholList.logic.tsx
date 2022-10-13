import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Alcohols } from "../../@types/alcohol";
import { IPageInfo } from "../../@types/pagination";
import { IListHandlers } from "../../components/List/List.view";
import useQueryParams from "../../utils/hooks/useQueryParams";

import AlcoholListView from "./AlcoholListView";

const options: { label: string; value: number }[] = [
  {
    value: 10,
    label: "10 wierszy na stronę",
  },
  {
    value: 25,
    label: "25 wierszy na stronę",
  },
  {
    value: 50,
    label: "50 wierszy na stronę",
  },
  {
    value: 100,
    label: "100 wierszy na stronę",
  },
];

interface Props {
  updateKind: (kind: string | null) => void;
  listRef: React.RefObject<IListHandlers>;
}

const AlcoholListLogic = ({ updateKind, listRef }: Props) => {
  const [selectedKind, setSelectedKind] = useState<string | null>(null);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const width = document.body.clientWidth;
  const isSmallScreen = () => width < 1200 && !!params.alcoholBarcode;
  const [collapse, setCollapse] = useState<boolean>(isSmallScreen());

  const onSelectedKind = (selected: { label: string; value: string }) => {
    const pathame = location.pathname.split("/");

    if (selected.value === "-") {
      setSelectedKind(null);
      updateKind(null);
      navigate(`/alcohol${location.search}`);
    } else {
      pathame[2] = selected.value;
      setSelectedKind(selected.value);
      navigate(`${pathame.join("/")}${location.search}`);
      updateKind(selected.value);
    }
  };

  const goToAlcoholDetails = (id: string, kind: string) => {
    navigate(`/alcohol/${kind}${id ? `/${id}` : ""}${location.search}`);
  };

  const onCollapse = () => {
    const pathname = location.pathname.split("/");
    pathname.pop();
    if (isSmallScreen()) {
      setCollapse(false);
      navigate(`${pathname.join("/")}${location.search}`);
      return;
    }
    setCollapse((prev) => !prev);
  };

  const isDetail = () => !!params.alcoholBarcode;

  useEffect(() => {
    const { kind } = params;
    if (kind) {
      onSelectedKind({ label: kind, value: kind });
    }
  }, []);

  useEffect(() => {
    if (isSmallScreen()) setCollapse(true);
  }, [params.alcoholBarcode]);

  return (
    <AlcoholListView
      selectedKind={selectedKind}
      onSelectedKind={onSelectedKind}
      goToAlcoholDetails={goToAlcoholDetails}
      collapse={collapse}
      onCollapse={onCollapse}
      isDetail={isDetail}
      listRef={listRef}
    />
  );
};

export default AlcoholListLogic;
