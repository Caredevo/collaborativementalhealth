
import React, { Suspense, lazy } from 'react';

const MHAction = lazy(() => import('./components/cards/MHAction'));
const MHFormulate = lazy(() => import('./components/cards/MHFormulate'));
const MHProfile = lazy(() => import('./components/cards/MHProfile'));
const MHProvider = lazy(() => import('./components/cards/MHProvider'));
const MHReview = lazy(() => import('./components/cards/MHReview'));
const MHSafety = lazy(() => import('./components/cards/MHSafety'));

export default function App(props) {

  var identity = props.identity;
  if (!identity) {
    identity = [null, null, null]
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='flex-container'>
              <MHReview identity={identity} />
              <MHAction identity={identity} />
              <MHFormulate identity={identity}/>
              <MHProvider identity={identity}/>
              <MHSafety identity={identity}/>
              <MHProfile identity={identity}/>
              
          </div>
    </Suspense>
      
  )
}