import React from 'react';
import {Link} from 'react-router'; 

export default () => {
  return (
    <div className='boxed-view'>
      <div className='boxed-view__box'>
        <h1>Sorry</h1>
        <p>There's Nothing To Be Found Here!</p>
        <Link className='button button--link' to='/'>Go Home...</Link>
      </div>
    </div>
  );
};