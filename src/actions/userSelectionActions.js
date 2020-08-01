import types from './types';

export const setUserSelection = (selection, index) => {  
    return {
        type: types.SET_USER_SELECTION,
        payload: {
            selection,
            index
        }
    }
}

export const editUserSelection = (selection, index) => {
    return {
        type: types.MODIFY_USER_SELECTION,
        payload: {
            selection,
            index
        }
    }
}

export const computeVehicleAvailabilty = (userSelection, vehicles) => {
    let vehicleAvailabilityMap = new Map();
    vehicles.forEach((vehicle) => {
        vehicleAvailabilityMap.set(vehicle.name, vehicle.total_no)
    });

    userSelection.forEach((selection) => {
        if (!selection.vehicle) return;
        let vehicleQty = vehicleAvailabilityMap.get(selection.vehicle.name);
        vehicleAvailabilityMap.set(selection.vehicle.name, vehicleQty - 1);
    })

    return {
        type: types.UPDATE_VEHICLE_AVAILABILITY,
        payload: { vehicleAvailabilityMap }
    };
}