import React, { useState }        from 'react';
import {connect}    from 'react-redux';
import types        from '../../actions/types';
import Modal        from '../modal/modal';
import HelpPage     from '../help/help';
import PropTypes from "prop-types";
import './header.scss';

const Header = (props) => {
    const [ helpModalOpen, setHlpModalState ] = useState(false);
    const headerButtons = props.headerbuttons ? props.headerbuttons : {reset:true,help:true};
    return (
        <React.Fragment>
            <header className="app-head">
                <div className="app-head-title">
                    <h2>Finding Falcone!</h2>
                </div>
                <div className="app-head-reset">
                    { headerButtons.reset && <button onClick={() => props.reset()} title="reset selection">🔁</button>}
                    { headerButtons.help && <button onClick={() =>{setHlpModalState(true)}} title="help">❓</button> }
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
    reset: PropTypes.func,
    headerbuttons: PropTypes.object
}
export default connect(null, mapDispatchToProps)(Header);