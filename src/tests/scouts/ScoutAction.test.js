import moxios from 'moxios';
import {
    testStore
} from '../../utils';

import {
    fetchScout,
} from '../../actions/scoutActions';

describe('Scouts actions', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    describe('fetchScout action', () => {

        it('Scout store is updated correctly', () => {

            const expectedState = [{
                date: 'Issue 1',
                entry: {},
                issue: {},
                issueCategory: {},
                latitude: '23.1',
                longitude: '45.1',
                plant: {},
                point: {},
                tolerance: {},
                value: '12',
                _id: '123456'
            }];

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: expectedState
                });
            });

            return store.dispatch(fetchScout())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.scout.scout).toBe(expectedState);
                });
        });

        it('Scout fetch errors', () => {

            const expectedState = {
                error: 'Scout not found'
            };

            const store = testStore();

            moxios.wait(() => {
                const request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: expectedState
                });
            });

            return store.dispatch(fetchScout())
                .then(() => {
                    const newState = store.getState();
                    expect(newState.errors).toBe(expectedState.error);
                });
        });
    });
});