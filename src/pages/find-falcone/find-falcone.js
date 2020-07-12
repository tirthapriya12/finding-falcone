import React                 from 'react';
import { connect }           from 'react-redux';
import { isEqual }           from 'lodash';
import { getPlanets }        from '../../actions/planetsActions';
import { getVehicles }       from '../../actions/vehiclesActions';
import { 
    setUserSelection,
    editUserSelection
}                            from '../../actions/userSelectionActions';
import PlanetVehicleSelector from '../../components/planet-vehicle-selector/planet-vehicle-selector';

class FindFalcone extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
            userSelection: []
        }
    }

    componentDidMount() {
        this.props.getPlanets();
        this.props.getVehicles();
    }

    componentDidUpdate(prevProps, prevState) {
        const { vehicles, planets, userSelection } = this.props;
        if (vehicles.loading !== prevProps.vehicles.loading || planets.loading !== prevProps.planets.loading) {
            this.setState({ isLoading: vehicles.loading || planets.loading });
        }
        if (!isEqual(this.state.userSelection, userSelection)) {
            this.setState({ userSelection });
        }
    }

    onUserSelection = (selection, index) => {
        const { userSelection, setUserSelection, editUserSelection } = this.props;

        if (userSelection.selections[Number(index) - 1]) {
            editUserSelection(selection, Number(index) - 1)
        } else {
            setUserSelection(selection);
        }
    }

    render(){
        const { vehicles, planets, userSelection } = this.props;
        return(
            <section className="app-finding-falcone-body">
                <PlanetVehicleSelector index="1" userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="2" userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="3" userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="4" userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlanets: () => (dispatch(getPlanets())),
        getVehicles: () => (dispatch(getVehicles())),
        setUserSelection: (selection, index) => { dispatch(setUserSelection(selection, index)) },
        editUserSelection: (selection, index) => { dispatch(editUserSelection(selection, index)) }
    }
};

const mapStateToProps = (state) => {
    const { vehicles, planets, userSelection } = state;
    return {
        vehicles,
        planets,
        userSelection
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FindFalcone);