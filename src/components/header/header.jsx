import React, { useState }        from 'react';
import {connect}    from 'react-redux';
import types        from '../../actions/types';
import Modal        from '../modal/modal';
import HelpPage     from '../help/help';
import PropTypes from "prop-types";
import './header.scss';

const Header = (props) => {
    const [ helpModalOpen, setHlpModalState ] = useState(false);
    return (
        <React.Fragment>
            <header className="app-head">
                <div className="app-head-title">
                    <h2>Finding Falcone!</h2>
                </div>
                <div className="app-head-reset">
                    <button onClick={() => props.reset()} title="reset selection">🔁</button>
                    <button onClick={() =>{setHlpModalState(true)}} title="help">❓</button>
                </div>
            </header>
            {
                helpModalOpen &&
                <Modal onClose={()=>setHlpModalState(false)}>
                    <HelpPage />
                </Modal>
            }
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => { dispatch({ type: types.RESET_USER_SELECTION }) }
    }
}

Header.propTypes = {
    reset: PropTypes.func
}
export default connect(null, mapDispatchToProps)(Header);