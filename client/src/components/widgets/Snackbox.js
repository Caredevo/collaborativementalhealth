import React from 'react';
import ReactDOM from 'react-dom';


const Snackbox = props => { 

    const snackboxShow = props.open;
    if (snackboxShow === true ) {
        return ReactDOM.createPortal (

        
        
                <div className='snackBar' >
                {props.message}
                </div>
           , 
             document.querySelector('#confirm')
            
        );
    }
    return null;
    
};

export default Snackbox;
