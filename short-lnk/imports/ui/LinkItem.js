import React from 'react';
import PropTypes from 'prop-types';

export default class LinkItem extends React.Component {
  render() {
    return <div>{this.props.link.url}</div>
  };
}

LinkItem.propTypes = {
  link: PropTypes.object.isRequired
};