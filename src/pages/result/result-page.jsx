import React from 'react';
import { connect } from 'react-redux';

const ResultPage = (props) => {
    return (
        <React.Fragment>
            {props.falconeFinder.status === 'success' ? `Success !! \n Found at ${props.falconeFinder.planet_name}` : ` Ooops!! couldn't find her in any of the planets selected`}
            <div>
                <button onClick={() => { window.location.href='/' }}>Play Again</button>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    const { falconeFinder } = state;
    return {
        falconeFinder
    }
}
export default connect(mapStateToProps)(ResultPage);