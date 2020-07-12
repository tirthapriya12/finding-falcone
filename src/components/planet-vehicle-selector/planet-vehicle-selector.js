import React, { 
    useState ,
    useEffect
}                           from 'react';
import PropTypes            from 'prop-types';
import './planet-vehicle-selector.scss'

const PlanetVehicleSelector = (props) => {
    const { vehicles, planets, index, userSelection, setUserSelection } = props;
    const defaultState = userSelection && userSelection[Number(index) - 1] || { planet: null, vehicle: null };
    const [selection, setSelection] = useState(defaultState);

    useEffect(() => {
        selection.planet && setUserSelection(selection, index); //on selection change update it to parent
    }, [selection]);

    const onPlanetSelection = (event) => {
        let planet = planets.find((planet) => (planet.name === event.target.value));
        setSelection({ planet, vehicle: null });
    }
    const onVehicleSelection = (vehicle) => {
        setSelection({ ...selection,vehicle });
    }


    return (
        <div className="app-pv-selector">
            <select onChange={onPlanetSelection}>
                {//If
                    (userSelection && userSelection.length === 0) ||
                    (!userSelection[Number(index) - 1] || !userSelection[Number(index) - 1].planet) ?
                    (<option selected hidden></option>) : '' /* to show blank as default selection */
                }
                {//If   
                    planets &&
                    planets.map((planet, id) => {
                        return (<option key={index + '_' + id}>{planet.name}</option>);
                    })
                }
            </select>
            <div>
                <ul>
                    {//If   
                        vehicles &&
                        vehicles.map((vehicle, id) => {
                            //update checked and disabled status when userSelection of planet changes 
                            let checked = userSelection[Number(index) - 1] && userSelection[Number(index) - 1].vehicle && vehicle.name === userSelection[Number(index) - 1].vehicle.name ? true : false;
                            let disabled = selection.planet && selection.planet.distance > vehicle.max_distance; // vehicle shouldn't be selectable if it's range is less.

                            return (
                                <li disabled={disabled} key={index + '_' + id}>
                                    <input type="radio" checked={checked} disabled={disabled} name={"vehicle_" + index} id={'veh_' + index + '_' + id} value={vehicle.name} onChange={() => onVehicleSelection(vehicle)} />
                                    <label htmlFor={'veh_' + index + '_' + id}>{vehicle.name}</label>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <span>
                { userSelection.length && selection.planet && selection.vehicle && selection.planet.distance/selection.vehicle.speed || '' }
            </span>
        </div>
    )
}

PlanetVehicleSelector.propType = {
    vehicles:         PropTypes.array,
    planets:          PropTypes.array,
    setUserSelection: PropTypes.func 
}


export default PlanetVehicleSelector;