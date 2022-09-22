import React from "react";
import { useLocation } from "react-router-dom";
import { CapitalCase } from "../../styles/global.styled";
import { Container, Crumb, Space, Last } from "./breadcrumb.styled";

const namePath = {
  home: "Panel główny",
  alcohol: "Alkohole",
};

const Breadcrumb = () => {
  const location = useLocation();
  const splitLocation = location?.pathname.split("/");
  // splitLocation.shift();
  const splitPath = splitLocation.filter((el) => el !== "" && el !== "home");

  splitLocation[0] = namePath.home;

  const paths = splitPath.reduce(
    (prev: string[], curr, index) => [
      ...prev,
      `${prev[index] === "/home" ? "" : prev[index]}/${curr}`,
    ],
    ["/home"]
  );
  const { length } = paths;

  console.log({ splitLocation, splitPath, paths });

  const JSX = paths?.map((path, index) => (
    <span key={path}>
      {length !== index + 1 ? (
        <>
          <Crumb to={path}>
            <CapitalCase>{splitLocation[index]}</CapitalCase>
          </Crumb>
          <Space>
            <span className="icon-chevron-right" />
          </Space>
        </>
      ) : (
        <Last>
          <CapitalCase>{splitLocation[index]}</CapitalCase>
        </Last>
      )}
    </span>
  ));
  return <Container>{JSX}</Container>;
};

export default Breadcrumb;
