import React from 'react';

import PrivateHeader from './PrivateHeader';
import LinksListFilter from './LinksListFilter';
import LinksList from './LinksList';
import AddLinkForm from './AddLinkForm';

export default function Link(props) {
  return (
    <div>
      <PrivateHeader title='Your Links' />
      <LinksListFilter />
      <LinksList />
      <AddLinkForm />
    </div>
  );
}