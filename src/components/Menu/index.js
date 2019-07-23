import React from 'react';
import {
  Wrapper, Button, Menu, MenuItem
} from 'react-aria-menubutton';
import { NavLink } from 'react-router-dom';
import MenuIcon from '../../assets/images/icons/menu.svg';
import { menuItemText } from '../../utils/text.js';


const MenuButton = () => {
  const menuItems = menuItemText.map((item, i) => (
    <li className="menu-li" key={i}>
      <MenuItem className={item.class}>
        <NavLink
          className={`nav-menu nav-${item.class}`}
          to={item.path}
        >
          { item.text }
        </NavLink>
      </MenuItem>
    </li>
  ));

  return (
    <Wrapper
      className="menu-btn-wrapper"
    >
      <Button className="menu-btn">
        <img
          src={MenuIcon}
          className="menu-icon-img"
          alt="Menu icon button"
        />
      </Button>
      <Menu className="menu-button-menu">
        <ul className="menu-ul">{menuItems}</ul>
      </Menu>
    </Wrapper>
  );
};

export default MenuButton;
