import {
    FETCH_SCOUT,
} from '../../actions/types';

import scoutReducer from '../../reducers/scoutReducer';

describe('Scout Reducer', () => {
    it('Should return default state', () => {
        const newState = scoutReducer(undefined, {});

        expect(newState).toEqual({
            scout: {},
            allScouts: [],
            scoutCreated: {},
            scoutUpdated: {},
            scoutDeleted: {},
            plantList: [],
            entryList: [],
            pointList: [],
            issueList: [],
            issueCategoryList: [],
            farmReportAlert: [],
            blockReport: {},
            bedReport: {},
            entryReport: [],
            alertMessage: "",
            allEntries: [],
            bedDates: [],
            allBlocks: [],
            allBeds: [],
            allVariety: [],
            allIssueTypes: [],
            allTolerance: [],
            allScores: [],
            printReport: [],
            prevalence: {},
            blockDates: [],
            allScoutPersonnel: []
        })
    });

    it('Should return a new scout state if receiving a scout', () => {
        const scouts = {
            rows: 1,
            items: [{
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
            }]
        };

        const newState = scoutReducer(undefined, {
            type: FETCH_SCOUT,
            payload: scouts
        });

        expect(newState.scout).toEqual(scouts);
    });
})