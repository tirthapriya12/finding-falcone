import React, {
       useState,
       useEffect
}                       from 'react';
import PropTypes        from 'prop-types';
import UserSelection    from '../../models/userSelection';
import './planet-vehicle-selector.scss';

class PlanetVehicleSelector extends React.Component {

    constructor(props) {
        super(props);
        const { index, userSelection } = props;
        const defaultSelectionState = userSelection && userSelection[Number(index) - 1] || new UserSelection();

        this.state = {
            selection: defaultSelectionState
        }

    }


    static getDerivedStateFromProps(props, state) {
        const { selection } = state;
        const { userSelection, index } = props;

        if (userSelection.length == 0) {
            return { selection: new UserSelection() }
        }
        return null;
    }

    onPlanetSelection = (event, planets) => {
        const { setUserSelection, index } = this.props;
        const { selection } = this.state
        let planet = planets.find((planet) => (planet.name === event.target.value));

        selection.setPlanet(planet);
        // reset vehicle selection because current planet distance may not support previously selected vehicle
        selection.setVehicle(null);  

        this.setState({ selection }, () => {
            setUserSelection(this.state.selection, index);
        });

    }

    onVehicleSelection = (vehicle) => {
        const { selection } = this.state;
        const { setUserSelection, index } = this.props;
        
        selection.setVehicle(vehicle);
        this.setState({ selection }, () => {
            setUserSelection(this.state.selection, index);
        });
    }
    
    /**
     * Renders vehicle list as radio buttons , disables vechicles based on userSlection in the list
     */
    renderVehicles = (props) => {
        let { vehicles, userSelection, index, vehicleAvailability } = props;
        let { selection } = this.state;


        return (
            <div className="app-pv-vehicles">
                <ul>
                    {//If   
                        vehicles &&
                        vehicles.map((vehicle, id) => {
                            //update checked and disabled status when userSelection of planet changes 
                            let vehicle_qty = vehicleAvailability && vehicleAvailability.get(vehicle.name);
                            let checked = userSelection[Number(index) - 1] && userSelection[Number(index) - 1].vehicle && vehicle.name === userSelection[Number(index) - 1].vehicle.name ? true : false;
                            // vehicle shouldn't be selectable if it's range is less.
                            let disabled = ((selection.planet && selection.planet.distance > vehicle.max_distance) ||
                                            (vehicle_qty === 0) ||
                                            !selection.planet) && !checked; // if it's checked don't disable this one

                            return (/**render vehicle selector (radio buttons) */
                                <li disabled={disabled} key={index + '_' + id}>
                                    <input type="radio" checked={checked} disabled={disabled} name={"vehicle_" + index} id={'veh_' + index + '_' + id} value={vehicle.name} onChange={() => this.onVehicleSelection(vehicle)} />
                                    <label htmlFor={'veh_' + index + '_' + id}>{vehicle.name + ' (' + vehicle_qty + ')'}</label>
                                </li>
                            )
                        }) 
                    }
                </ul>
            </div>
        )
    }

    /**
     * Renders Planet selection list , disables those  planets which are selected in any other selection slot
     */
    renderPlanets = (props) => {
        let { planets, userSelection, index } = props;
        let { selection } = this.state;
        let selectedPlanets = [];

        userSelection.forEach((selection) => {
            selection.planet && selectedPlanets.push(selection.planet.name);
        })

        return (
            <select className="app-pv-planets" onChange={(e) => this.onPlanetSelection(e, planets)}>
                {//If
                    (userSelection && userSelection.length === 0) ||
                        (!userSelection[Number(index) - 1] || !userSelection[Number(index) - 1].planet) ?
                        (<option key="-1" selected hidden></option>) : '' /* to show blank as default selection or */
                }
                {//If   
                    planets &&
                    planets.map((planet, id) => {/**Render planets dropdown selector */
                        let disabled = selectedPlanets.indexOf(planet.name) > -1;
                        return (<option disabled={disabled} key={index + '_' + id}>{planet.name}</option>);
                    }) 
                }
            </select>
        )
    }

    
    render() {
        const props = this.props;
        const { selection } = this.state;
        return (
            <div className="app-pv-selector">
                {this.renderPlanets(props)}
                {this.renderVehicles(props)}

                { //If
                    props.userSelection.length && selection.planet && selection.vehicle ?
                    (
                        <span className="app-pv-time-taken">
                            <label>Time taken: </label>
                            <span>
                                {selection.planet.distance / selection.vehicle.speed || ''}
                            </span>
                        </span>
                    ) : ''
                }

            </div>
        );
    }
}

PlanetVehicleSelector.propType = {
    vehicles: PropTypes.array,
    planets: PropTypes.array,
    setUserSelection: PropTypes.func
}


export default PlanetVehicleSelector;