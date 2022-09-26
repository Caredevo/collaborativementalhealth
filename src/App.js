
import React, { Suspense, lazy } from 'react';

const MHPlan = lazy(() => import('./components/cards/MHPlan'));

export default function App(props) {
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <div className='flex-container'>
            <MHPlan /> 
        </div>
    </Suspense>  
  )
}