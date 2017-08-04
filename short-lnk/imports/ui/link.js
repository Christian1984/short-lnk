import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLinkForm from './AddLinkForm';

export default class Link extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title='Your Links' />
        <LinksList />
        <AddLinkForm />
      </div>
    );
  }
};