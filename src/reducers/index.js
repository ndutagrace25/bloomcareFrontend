import {
    combineReducers
} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import personnelReducer from './personnelReducer';
import blockReducer from './blockReducer'
import toleranceTypeReducer from './toleranceTypeReducer'
import bedReducer from './bedReducer';
import flowerReducer from './flowerReducer';
import issueTypeReducer from './issueTypeReducer';
import issueReducer from './issueReducer';
import plantReducer from './plantReducer';
import toleranceReducer from './toleranceReducer';
import issueCategoryReducer from './issueCategoryReducer';
import scoutReducer from './scoutReducer';
import subBlockReducer from './subBlockReducer';
import entryReducer from './entryReducer';
import pointReducer from './pointReducer';
import printReducer from './printReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    personnel: personnelReducer,
    block: blockReducer,
    toleranceType: toleranceTypeReducer,
    bed: bedReducer,
    flower: flowerReducer,
    issueType: issueTypeReducer,
    issue: issueReducer,
    plant: plantReducer,
    tolerance: toleranceReducer,
    issueCategory: issueCategoryReducer,
    scout: scoutReducer,
    subBlock: subBlockReducer,
    entry: entryReducer,
    point: pointReducer,
    printReport: printReducer
});