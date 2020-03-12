import React from 'react';
import { Link } from 'gatsby';

const Navbar = props => {
  return (
    <nav className="header__nav text-right container">
      <Link to="/" className="header__logo"></Link>
      <ul>
        {props.menu.map((item, i) => {
          if (item.external) {
            return (
              <a key={i} href={item.path} className="header__item__link fade hide-mobile">
                {item.label}
              </a>
            );
          } else {
            return (
              <Link key={i} to={item.path} className="header__item__link fade hide-mobile">
                {item.label}
              </Link>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
