import React                 from 'react';
import { connect }           from 'react-redux';
import { isEqual }           from 'lodash';
import { getPlanets }        from '../../actions/planetsActions';
import { getVehicles }       from '../../actions/vehiclesActions';
import { 
    setUserSelection,
    editUserSelection,
    computeVehicleAvailabilty
}                            from '../../actions/userSelectionActions';
import PlanetVehicleSelector from '../../components/planet-vehicle-selector/planet-vehicle-selector';
import Spinner               from '../../components/spinner/spinner';
import './find-falcone.scss';


class FindFalcone extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading:false,
        }
    }

    componentDidMount() {
        const { vehicles, userSelection, updateVehicleAvailabilty } = this.props;
        
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

    onUserSelection = (selection, index) => {
        const { userSelection, setUserSelection, editUserSelection } = this.props;

        // if (userSelection.selections[Number(index) - 1]) {
        //     editUserSelection(selection, Number(index) - 1)
        // } else {
            setUserSelection(selection,Number(index)-1);
        // }
        
    }

    render(){
        const { vehicles, planets, userSelection } = this.props;
        const { isLoading } = this.state;
        if(isLoading){
            return (
                <Spinner/>
            )
        }
        return(
            <section className="app-finding-falcone-body">
                <PlanetVehicleSelector index="1" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="2" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="3" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
                <PlanetVehicleSelector index="4" vehicleAvailability={userSelection.vehicleAvailabilityMap} userSelection={userSelection.selections} vehicles={vehicles.vehicleList} planets={planets.planetList} setUserSelection={this.onUserSelection}/>
            </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlanets: () => (dispatch(getPlanets())),
        getVehicles: (callback) => (dispatch(getVehicles(callback))),
        setUserSelection: (selection, index) => { dispatch(setUserSelection(selection, index)) },
        editUserSelection: (selection, index) => { dispatch(editUserSelection(selection, index)) },
        updateVehicleAvailabilty: (userSelection,vehicles)=>{ dispatch(computeVehicleAvailabilty(userSelection,vehicles)) }
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