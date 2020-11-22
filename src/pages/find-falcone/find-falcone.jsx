import React                   from 'react';
import { connect }             from 'react-redux';
import { isEqual }             from 'lodash';
import { withRouter }          from 'react-router-dom';
import { getPlanets }          from '../../actions/planetsActions';
import { getVehicles }         from '../../actions/vehiclesActions';
import {
    getToken,
    findFalcone
}                              from '../../actions/findFalconeAction';
import { 
    setUserSelection,
    editUserSelection,
    computeVehicleAvailabilty
}                              from '../../actions/userSelectionActions';
import PlanetVehicleSelector   from '../../components/planet-vehicle-selector/planet-vehicle-selector';
import Spinner                 from '../../components/spinner/spinner';
import DefaultPageLayout       from '../../components/layout/default-page-layout';
import './find-falcone.scss';

const MAX_SELECTABLE_PLANETS = 4;
class FindFalcone extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
        }
    }

    componentDidMount() {
        const { vehicles, userSelection, updateVehicleAvailabilty } = this.props;
        
        this.props.getToken();
        this.props.getPlanets();
        this.props.getVehicles(()=>{
            updateVehicleAvailabilty(userSelection.selections,vehicles.vehicleList);
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { vehicles, planets, userSelection, updateVehicleAvailabilty } = this.props;
        
        if (vehicles.loading !== prevProps.vehicles.loading || planets.loading !== prevProps.planets.loading) {
            this.setState({ isLoading: vehicles.loading || planets.loading });
        }

        if (!isEqual(prevProps.userSelection, userSelection)) {
            updateVehicleAvailabilty(userSelection.selections,vehicles.vehicleList);
        }
    }

    _onUserSelection = (selection, index) => {
        const { setUserSelection } = this.props;
        setUserSelection(selection, Number(index) - 1);
    }

    _onSubmit(){
        const { userSelection, falconeFinder } = this.props;
        this.setState({isLoading:true})
        this.props.findFalcone(falconeFinder.token, userSelection.selections, () => {
            this.setState({ isLoading: false })
            this.props.history.push('/result');
        });
    }

    renderSelectionStats() {
        const { userSelection } = this.props;
        let selectionStat = 0;
        if (!userSelection.selections) return 0;

        userSelection.selections.forEach((selection) => {
            if (selection && selection.vehicle && selection.planet) {
                selectionStat += (selection.planet.distance / selection.vehicle.speed);
            }
        })


        return (
            <section className="app-finding-falcone-selection-stats">
                Total Time Taken : { selectionStat || ''}
            </section>
        )
    }

    render(){
        const { vehicles, planets, userSelection } = this.props;
        const { isLoading } = this.state;
        const isSubmitDisabled = userSelection.selections.filter((selection) => { return (selection && selection.vehicle && selection.planet) }).length !== MAX_SELECTABLE_PLANETS;
        const headerButtons = { reset: true, help:true };
        if(isLoading){
            return (
                <Spinner/>
            )
        }

        return(
            <DefaultPageLayout headerbuttons={headerButtons}>
                <section className="app-finding-falcone">
                    <section className="app-finding-falcone-body">
                        <PlanetVehicleSelector index="1" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this._onUserSelection} />
                        <PlanetVehicleSelector index="2" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this._onUserSelection} />
                        <PlanetVehicleSelector index="3" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this._onUserSelection} />
                        <PlanetVehicleSelector index="4" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this._onUserSelection} />
                    </section>
                    <div className="app-finding-falcone-divider"></div>
                    {this.renderSelectionStats()}

                </section>
                <div className="app-finding-falcone-submit"><button onClick={this._onSubmit.bind(this)} disabled={isSubmitDisabled}>Submit</button></div>
            </DefaultPageLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: () => (dispatch(getToken())),
        getPlanets: () => (dispatch(getPlanets())),
        getVehicles: (callback) => (dispatch(getVehicles(callback))),
        findFalcone: (token, selection, callback) => (dispatch(findFalcone(token, selection, callback))),
        setUserSelection: (selection, index) => { dispatch(setUserSelection(selection, index)) },
        editUserSelection: (selection, index) => { dispatch(editUserSelection(selection, index)) },
        updateVehicleAvailabilty: (userSelection, vehicles) => { dispatch(computeVehicleAvailabilty(userSelection, vehicles)) }
    }
};

const mapStateToProps = (state) => {
    const { vehicles, planets, userSelection, falconeFinder } = state;
    return {
        vehicles,
        planets,
        userSelection,
        falconeFinder
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FindFalcone));