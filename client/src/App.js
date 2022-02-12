
import React, { Suspense, lazy } from 'react';
import { clientDecryption } from './Security';


const MHAction = lazy(() => import('./components/cards/MHAction'));
const MHFormulate = lazy(() => import('./components/cards/MHFormulate'));
const MHProfile = lazy(() => import('./components/cards/MHProfile'));
const MHProvider = lazy(() => import('./components/cards/MHProvider'));
const MHReview = lazy(() => import('./components/cards/MHReview'));
const MHSafety = lazy(() => import('./components/cards/MHSafety'));

export default function App(props) {

  //receiving and decrypting data from parent client
  var parentData = clientDecryption(props.identity[0].data);
  var parentToken = clientDecryption(props.identity[1].data);
  var ptid = parentData.ptid._id;
  var permit = parentData.permit;
  var userId = parentData.userId;
  var token = parentToken.token;
  var config = {
    headers:{
    Authorization: token,
        }
    };

  var identity = [ptid, permit, userId, config];
  ///

  if (!identity) {
    identity = [null, null, null, null]
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