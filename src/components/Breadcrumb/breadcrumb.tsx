import React from "react";
import { useLocation } from "react-router-dom";
import { CapitalCase } from "../../styles/global.styled";
import { NAME_PATH } from "../../utils/constant";
import { Container, Crumb, Space, Last } from "./breadcrumb.styled";

const writePath = (path: string) => {
  const decodePath = decodeURIComponent(path);
  const fromNamePath = NAME_PATH[decodePath as keyof typeof NAME_PATH];

  return fromNamePath || decodePath;
};

const Breadcrumb = () => {
  const location = useLocation();
  const splitLocation = location?.pathname.split("/");
  const splitPath = splitLocation.filter((el) => el !== "" && el !== "home");

  splitLocation[0] = NAME_PATH.home;

  const paths = splitPath.reduce(
    (prev: string[], curr, index) => [
      ...prev,
      `${prev[index] === "/home" ? "" : prev[index]}/${curr}`,
    ],
    ["/home"]
  );
  const { length } = paths;

  const JSX = paths?.map((path, index) => (
    <span key={path}>
      {length !== index + 1 ? (
        <>
          <Crumb to={path}>
            <CapitalCase>{writePath(splitLocation[index])}</CapitalCase>
          </Crumb>
          <Space>
            <span className="icon-chevron-right" />
          </Space>
        </>
      ) : (
        <Last>
          <CapitalCase>{writePath(splitLocation[index])}</CapitalCase>
        </Last>
      )}
    </span>
  ));
  return <Container>{JSX}</Container>;
};

export default Breadcrumb;
