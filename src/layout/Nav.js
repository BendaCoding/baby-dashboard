import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { __RouterContext } from 'react-router-dom';
import { LayoutContext } from '@@utils/';

const MenuItem = ({ title, to, pathname }) => (
  <Menu.Item active={pathname === to} name={title}>
    <NavLink to={to}>{title}</NavLink>
  </Menu.Item>
);

export const Nav = () => {
  const { location } = useContext(__RouterContext);
  const [showSidebar, toggleSidebar] = useContext(LayoutContext);

  return (
    <Menu inverted secondary>
      <MenuItem pathname={location.pathname} to="/" title="Dashboard" />
      <MenuItem
        pathname={location.pathname}
        to="/highscore"
        title="Highscore"
      />
      <Menu.Item
        active={showSidebar}
        name="Customize"
        onClick={() => toggleSidebar(!showSidebar)}
      >
        Customize
      </Menu.Item>
    </Menu>
  );
};
