import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { __RouterContext } from 'react-router-dom';

const MenuItem = ({ title, to, pathname }) => (
  <Menu.Item active={pathname === to} name={title}>
    <NavLink to={to}>{title}</NavLink>
  </Menu.Item>
);

export const Nav = () => {
  const { location } = useContext(__RouterContext);

  return (
    <Menu inverted secondary>
      <MenuItem pathname={location.pathname} to="/" title="Needs" />
      <MenuItem pathname={location.pathname} to="/pie-chart" title="Other" />
    </Menu>
  );
};
