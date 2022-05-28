import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Crumb, Space, Last } from './breadcrumb.styled';

const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Breadcrumb = () => {
  const location = useLocation();
  const splitLocation = location?.pathname.split('/');
  const splitPath = splitLocation.filter((el) => el !== '' && el !== 'home');

  splitLocation[0] = 'Home';

  const paths = splitPath.reduce(
    (prev: string[], curr, index) => [...prev, `${prev[index]}/${curr}`],
    ['/home']
  );
  const { length } = paths;

  const JSX = paths?.map((path, index) => (
    <span key={path}>
      {length !== index + 1 ? (
        <>
          <Crumb to={path}>{capitalize(splitLocation[index])}</Crumb>
          <Space> {'  /  '} </Space>
        </>
      ) : (
        <Last>{capitalize(splitLocation[index])}</Last>
      )}
    </span>
  ));
  return <Container>{JSX}</Container>;
};

export default Breadcrumb;
