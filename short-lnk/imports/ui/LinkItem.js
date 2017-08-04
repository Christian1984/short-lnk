import React from 'react';
import PropTypes from 'prop-types';

function LinkItem(props) {
  return (
    <div>
      {props.link.url}, {props.link._id}
    </div>
  );
}

LinkItem.propTypes = {
  link: PropTypes.object.isRequired
};

export default LinkItem;