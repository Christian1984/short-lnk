import React from 'react';
import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';

let PrivateHeader = (props) => {
  return (
    <div className='title-bar'>
      <div className='wrapper'>
        <div className='title-bar__flex-wrapper'>
          <h1 className='title-bar__title'>{props.title}</h1>
          <button className='button button--underlined' onClick={() => Accounts.logout()}>Logout</button>
        </div>
      </div>
    </div>
    );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default PrivateHeader;