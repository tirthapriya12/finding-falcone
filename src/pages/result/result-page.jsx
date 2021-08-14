import React             from 'react';
import { connect }       from 'react-redux';
import DefaultPageLayout from '../../components/layout/default-page-layout';
import resultFalcone     from '../../assets/falcon_result.PNG';
import './result-page.scss';

const ResultPage = (props) => {

    const headerButtons = { reset: false, help:true };
    return (
        <DefaultPageLayout headerbuttons={headerButtons}>
            <section className="app-result">
                <section className="app-result-card">
                    <img className="app-result-card-img" src={resultFalcone} />
                    <h3>Result</h3>
                    <p>{props.falconeFinder.status === 'success' ? `Success !! \n We found Falcone at ${props.falconeFinder.planet_name}` : ` Ooops!! couldn't find her in any of the planets selected`}</p>
                    <div className="app-result-playagain-btn">
                        <button onClick={() => { window.location.href = '/' }}>Play Again</button>
                    </div>
                </section>
            </section>
        </DefaultPageLayout>
    )
}

const mapStateToProps = (state) => {
    const { falconeFinder } = state;
    return {
        falconeFinder
    }
}
export default connect(mapStateToProps)(ResultPage);