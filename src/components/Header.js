import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ selectedYear }) => (
  <header>
    <h1>
      Infant mortality rate in Africa (per 1,000 live births) in
      {' '}
      {` ${selectedYear} `}
    </h1>
  </header>
);

Header.propTypes = {
  selectedYear: PropTypes.number,
};

export default Header;
