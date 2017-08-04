import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksList from './LinksList';
import AddLinkForm from './AddLinkForm';

export default function Link(props) {
  return (
    <div>
      <PrivateHeader title='Your Links' />
      <LinksList />
      <AddLinkForm />
    </div>
  );
}