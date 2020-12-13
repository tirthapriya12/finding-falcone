import React from 'react';

import { shallow } from 'enzyme';
import { mockStore } from '../../utils/mockStore';
import { Provider } from "react-redux";
import FindFalcone from './find-falcone';

const mockStoreValue = {
    "vehicles": {
        "vehicleList": [
            {
                "name": "Space pod",
                "total_no": 2,
                "max_distance": 200,
                "speed": 2
            },
            {
                "name": "Space rocket",
                "total_no": 1,
                "max_distance": 300,
                "speed": 4
            },
            {
                "name": "Space shuttle",
                "total_no": 1,
                "max_distance": 400,
                "speed": 5
            },
            {
                "name": "Space ship",
                "total_no": 2,
                "max_distance": 600,
                "speed": 10
            }
        ],
        "loading": false
    },
    "planets": {
        "loading": false,
        "planetList": [
            {
                "name": "Donlon",
                "distance": 100
            },
            {
                "name": "Enchai",
                "distance": 200
            },
            {
                "name": "Jebing",
                "distance": 300
            },
            {
                "name": "Sapir",
                "distance": 400
            },
            {
                "name": "Lerbin",
                "distance": 500
            },
            {
                "name": "Pingasor",
                "distance": 600
            }
        ]
    },
    "userSelection": {
        "selections": [
            {
                "planet": "{distance: 400, name: \"Sapir\"}",
                "vehicle": null
            },
            {
                "planet": "{distance: 500, name: \"Lerbin\"}",
                "vehicle": null
            },
            {
                "planet": null,
                "vehicle": null
            },
            {
                "planet": null,
                "vehicle": null
            }
        ]
    }
};
const mock_store = mockStore(mockStoreValue);
const renderComponent = (props) => {

    return shallow(
        <Provider store={mock_store}>
            <FindFalcone {...props} />
        </Provider>).dive();
}

let props;
describe('Test FindFalcone', () => {
    beforeEach(() => {
        props = {
            getToken: jest.fn(),
            getPlanets: jest.fn(),
            getVehicles: jest.fn(),
            findFalcone: jest.fn(),
            setUserSelection: jest.fn(),
            editUserSelection: jest.fn(),
            updateVehicleAvailabilty: jest.fn(),
            history: { push: jest.fn() }
        }
    });

    test('FindFalcone renders', () => {
        expect(renderComponent(props).isEmptyRender()).toBeFalsy()
    })
})