import {
    FETCH_PERSONNEL,
    CREATE_PERSONNEL,
    UPDATE_PERSONNEL,
    DELETE_PERSONNEL
} from '../../actions/types';

import personnelReducer from '../../reducers/personnelReducer';

describe('personnelReducer Reducer', () => {
    it('Should return default state', () => {
        const newState = personnelReducer(undefined, {});

        expect(newState).toEqual({
            personnel: {},
            personnelCreated: {},
            personnelUpdated: {},
            personnelDeleted: {},
            personnelType: [],
            personnelErrors: {}
        })
    });

    it('Should return a new personnel state if receiving a personnel', () => {
        const personnels = {
            rows: 1,
            items: [{
                first_name: 'personnelReducer 1',
                last_name: 'PerssonelLast',
                phone: '0700000',
                status: '1',
                personnel_type_id: "",
                _id: '123456'
            }]
        };

        const newState = personnelReducer(undefined, {
            type: FETCH_PERSONNEL,
            payload: personnels
        });

        expect(newState.personnel).toEqual(personnels);
    });

    // test for personnelCreated
    it('Should return a new personnel state if created a personnel', () => {
        const personnels = {
            rows: 1,
            items: [{
                first_name: 'personnelReducer 1',
                last_name: 'PerssonelLast',
                phone: '0700000',
                status: '1',
                personnel_type_id: "",
                _id: '123456'
            }]
        };

        const newState = personnelReducer(undefined, {
            type: CREATE_PERSONNEL,
            payload: personnels
        });

        expect(newState.personnelCreated).toEqual(personnels);
    });

    // test for personnelUpdated
    it('Should return a new personnel state if updated a personnel', () => {
        const personnels = {
            rows: 1,
            items: [{
                first_name: 'personnelReducer 1',
                last_name: 'PerssonelLast',
                phone: '0700000',
                status: '1',
                personnel_type_id: "",
                _id: '123456'
            }]
        };

        const newState = personnelReducer(undefined, {
            type: UPDATE_PERSONNEL,
            payload: personnels
        });

        expect(newState.personnelUpdated).toEqual(personnels);
    });

    // test for Point deleted
    it('Should return a new personnel state if deleted an personnel', () => {
        const personnels = {
            rows: 1,
            items: [{
                first_name: 'personnelReducer 1',
                last_name: 'PerssonelLast',
                phone: '0700000',
                status: '1',
                personnel_type_id: "",
                _id: '123456'
            }]
        };

        const newState = personnelReducer(undefined, {
            type: DELETE_PERSONNEL,
            payload: personnels
        });

        expect(newState.personnelDeleted).toEqual(personnels);
    });
})