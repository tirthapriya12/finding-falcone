import React        from 'react';
import {connect}    from 'react-redux';
import types        from '../../actions/types';
import './header.scss';

const Header = (props) => {
    return (
        <header className="app-head">
            <div className="app-head-title">
                <h2>Finding Falcone!</h2>
            </div>
            <div className="app-head-reset">
                <button onClick={()=>props.reset()} title="reset">🔁</button>
                <button title="help">❓</button>
            </div>
        </header>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        reset: () => { dispatch({ type: types.RESET_USER_SELECTION }) }
    }
}
export default connect(null, mapDispatchToProps)(Header);