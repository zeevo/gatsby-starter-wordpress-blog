import React from 'react';
import { Link } from 'gatsby';

const Navbar = props => (
  <nav className="header__nav text-right container">
    {/* <Link to="/" className="header__logo"></Link> */}
    <ul>
      {props.menu.map((item, i) => {
        if (item.external) {
          return (
            <a key={i} href={item.slug} className="header__item__link fade hide-mobile">
              {item.title}
            </a>
          );
        }
        return (
          <Link key={i} to={item.slug} className="header__item__link fade hide-mobile">
            {item.title}
          </Link>
        );
      })}
    </ul>
  </nav>
);

export default Navbar;
