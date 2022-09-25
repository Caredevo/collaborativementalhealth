
import React, { Suspense, lazy } from 'react';
import { clientDecryption } from './Security';


const MHAction = lazy(() => import('./components/cards/MHAction'));
const MHFormulate = lazy(() => import('./components/cards/MHFormulate'));
const MHProfile = lazy(() => import('./components/cards/MHProfile'));
const MHProvider = lazy(() => import('./components/cards/MHProvider'));
const MHReview = lazy(() => import('./components/cards/MHReview'));
const MHSafety = lazy(() => import('./components/cards/MHSafety'));

const MHSubjective = lazy(() => import('./components/cards/MHSubjective'));
const MHAnalysis = lazy(() => import('./components/cards/MHAnalysis'));
const MHMedication = lazy(() => import('./components/cards/MHMedication'));
const MHPlan = lazy(() => import('./components/cards/MHPlan'));

export default function App(props) {

  var identity;
  if (!props.identity) {
    identity = ["603cc70b091c763150cb5ffd","Read and write","60f17d4884c39a14e87f50f2","124", "2", ""]
    // identity = [null, null, null, null, null, null]
    console.log("no props defined");
  }

  else if (props.identity) {
    //receiving and decrypting data from parent client
    var parentData = clientDecryption(props.identity[0].data);
    var parentToken = clientDecryption(props.identity[1].data);

    var ptid = parentData.ptid._id;
    var permit = parentData.permit.mentalhealth;
    var userId = parentData.userId;
    var token = parentToken.token;
    var practiceId = parentData.practiceId;
    var externalId = parentData.externalId;
    var config = {
      headers:{
      Authorization: token,
          }
      };

    if (!ptid || !permit || !userId) {
        // identity = ["603cc70b091c763150cb5ffd","Read and write","60f17d4884c39a14e87f50f2","124", "2", ""]
        identity = [null, null, null, null, null, null]
    } else {
        identity = [ptid, permit, userId, practiceId, externalId, config];
    }

  }
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <div className='flex-container'>
            <MHPlan identity={identity} /> 
            {/* <MHAnalysis identity={identity} /> 
            <MHSubjective identity={identity}/>
            <MHMedication identity={identity} /> 
            <MHReview identity={identity} />
            <MHAction identity={identity} />
            <MHFormulate identity={identity}/>
            <MHProvider identity={identity}/>
            <MHSafety identity={identity}/>
            <MHProfile identity={identity}/> */}
        </div>
    </Suspense>  
  )
}