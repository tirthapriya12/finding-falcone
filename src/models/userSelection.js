export default class UserSelection {

    planet;
    vehicle;
    constructor(planet, vehicle) {
        this.setPlanet(planet);
        this.setVehicle(vehicle);
    }

    setPlanet(planet) {
        this.planet = planet || null;;
    }
    setVehicle(vehicle) {
        this.vehicle = vehicle || null;
    }
}