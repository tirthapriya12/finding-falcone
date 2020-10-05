// Modal.js
import React from 'react';
import { createPortal } from 'react-dom';
import './modal.scss'

const modalRoot = document.createElement('div');
modalRoot.id = 'modal';
document.body.append(modalRoot);

class Modal extends React.Component {
   constructor( props ) {
      super( props );
  
    this.element = document.createElement( 'div' );
    this.element.className = "my-modal";
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

   onClose = () => {
      this.element.style.display = 'none';
      this.props.onClose && this.props.onClose();
   }

render() {
      const modalWrap = (
         <React.Fragment>
            <button onClick={this.onClose} className="modal-close">X</button>
            <section className="modal-body">
               {this.props.children}
            </section>
         </React.Fragment>
      )
      return createPortal( modalWrap, this.element );
   }
}
export default Modal;