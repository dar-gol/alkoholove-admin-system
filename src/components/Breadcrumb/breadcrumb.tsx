import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from './breadcrumb.styled';

const Breadcrumb = () => {
  const location = useLocation();
  const splitLocation = location?.pathname.split('/');
  const paths = splitLocation
    .reduce(
      (prev: string[], curr, index) => {
        if (curr === '' || curr === 'home') prev.push('');
        else prev.push(`${splitLocation[index - 1]}/${curr}`);
        return prev;
      },
      ['/home']
    )
    .filter((value) => value !== '');
  const JSX = paths?.map((path, index) => (
    <span key={path}>
      {' '}
      <Link to={path}>
        {splitLocation[index] ? splitLocation[index] : 'Home'}
      </Link>{' '}
      {paths.length !== index + 1 ? '/' : ''}
    </span>
  ));
  return <Container>{JSX}</Container>;
};

export default Breadcrumb;
