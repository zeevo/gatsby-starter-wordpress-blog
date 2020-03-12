import React from 'react';
import moment from 'moment';

import Navbar from './Navbar';
import defaultBackground from '../assets/background.jpg';

export default function Header(props) {
  const { title, subtitle, date, menu, background, children } = props;

  const finalBackground = background || defaultBackground;
  return (
    <header className="header header--cover" style={{ backgroundImage: `url(${finalBackground})` }}>
      <Navbar menu={menu} />
      <section className="header__header container">
        <h1>{title}</h1>
        <h3 style={{ fontWeight: 'normal' }}>{subtitle}</h3>
        {date ? moment(date).format('MMMM D, YYYY') : null}
      </section>
      {children}
    </header>
  );
}
