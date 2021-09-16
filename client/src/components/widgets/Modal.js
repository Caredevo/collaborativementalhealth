import React from 'react';
import ReactDOM from 'react-dom';


const Modal = props => { 


    const modalShow = props.open;
    if (modalShow === true ) {
        return ReactDOM.createPortal (

        
            <div onClick={props.onDismiss} className='modalDimmer'>
                <div onClick={(e) => e.stopPropagation()} className='modalCard' style={{height:props.height, width:props.width}}>
                    <div className='header'>{props.title}</div>
                    {props.content}
                </div>
            </div>, 
            document.querySelector('#modal')
            
        );
    }
    return null;
    
};

export default Modal;
