// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';

const modalDiv = document.createElement('div');
modalDiv.id = 'modal';
const modalRoot = document.getElementById( 'modal' ) ? document.getElementById( 'modal' ): document.body.append(modalDiv);

class Modal extends React.Component {
   constructor( props ) {
      super( props );
  
    this.element = document.createElement( 'div' );
   }
 
   componentDidMount() {
      modalRoot.appendChild( this.element );
   }
  /**
    * remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak 
    */
   componentWillUnmount() {
      modalRoot.removeChild( this.element );
   }
render() {
      return createPortal( this.props.children, this.element );
   }
}
export default Modal;