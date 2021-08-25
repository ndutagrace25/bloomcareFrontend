import {
    FETCH_SCOUT,
    CREATE_SCOUT,
    UPDATE_SCOUT,
    DELETE_SCOUT,
    FETCH_PLANT,
    FETCH_ENTRY,
    FETCH_POINT,
    FETCH_ISSUE,
    FETCH_ISSUE_CATEGORY,
    FETCH_FARM,
    BLOCK_REPORT,
    BED_REPORT,
    ENTRY_REPORT,
    FETCH_ALL_ENTRIES,
    FETCH_BED_DATE,
    FETCH_SCOUT_BLOCKS,
    FETCH_ALL_BEDS,
    FETCH_ALL_VARIETY,
    FETCH_ALL_ISSUE_TYPES,
    FETCH_TOLERANCE,
    FETCH_SCORE,
    FETCH_PRINT_REPORT,
    FETCH_ALL_SCOUTS,
    FETCH_PREVALANCE,
    FETCH_ALL_SCOUT_PERSONNEL,
    FETCH_BLOCK_DATES,
    FETCH_TIME_REPORT,
    FETCH_VARIETY_REPORT,
    FETCH_SCOUT_TRACKING,
    BLOCK_REPORT_PAGINATED,
    FETCH_FARM_BY_DATE
} from '../actions/types';

const initialState = {
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
    blockReportPaginated: {},
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
    prevalence: [],
    allScoutPersonnel: [],
    blockDates: [],
    timeReport: [],
    varietyReport: [],
    trackingReport: [],
    farmReportByDate: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SCOUT:
            return {
                ...state,
                scout: action.payload
            }
            case CREATE_SCOUT:
                return {
                    ...state,
                    scoutCreated: action.payload
                }
                case UPDATE_SCOUT:
                    return {
                        ...state,
                        scoutUpdated: action.payload
                    }
                    case DELETE_SCOUT:
                        return {
                            ...state,
                            scoutDeleted: action.payload
                        }
                        case FETCH_PLANT:
                            return {
                                ...state,
                                plantList: action.payload
                            }
                            case FETCH_ENTRY:
                                return {
                                    ...state,
                                    entryList: action.payload
                                }
                                case FETCH_POINT:
                                    return {
                                        ...state,
                                        pointList: action.payload
                                    }
                                    case FETCH_ISSUE:
                                        return {
                                            ...state,
                                            issueList: action.payload
                                        }
                                        case FETCH_ISSUE_CATEGORY:
                                            return {
                                                ...state,
                                                issueCategoryList: action.payload
                                            }
                                            case FETCH_FARM:
                                                return {
                                                    ...state,
                                                    farmReportAlert: action.payload,
                                                }
                                                case BLOCK_REPORT:
                                                    // console.log(action.payload);
                                                    return {
                                                        ...state,
                                                        blockReport: action.payload
                                                    }
                                                    case BED_REPORT:
                                                        // console.log(action.payload);
                                                        return {
                                                            ...state,
                                                            bedReport: action.payload
                                                        }
                                                        case ENTRY_REPORT:
                                                            return {
                                                                ...state,
                                                                entryReport: action.payload
                                                            }
                                                            case FETCH_ALL_ENTRIES:
                                                                return {
                                                                    ...state,
                                                                    allEntries: action.payload
                                                                }
                                                                case FETCH_BED_DATE:
                                                                    return {
                                                                        ...state,
                                                                        bedDates: action.payload
                                                                    }
                                                                    case FETCH_SCOUT_BLOCKS:
                                                                        return {
                                                                            ...state,
                                                                            allBlocks: action.payload
                                                                        }
                                                                        case FETCH_ALL_BEDS:
                                                                            return {
                                                                                ...state,
                                                                                allBeds: action.payload
                                                                            }
                                                                            case FETCH_ALL_VARIETY:
                                                                                return {
                                                                                    ...state,
                                                                                    allVariety: action.payload
                                                                                }
                                                                                case FETCH_ALL_ISSUE_TYPES:
                                                                                    return {
                                                                                        ...state,
                                                                                        allIssueTypes: action.payload
                                                                                    }
                                                                                    case FETCH_TOLERANCE:
                                                                                        return {
                                                                                            ...state,
                                                                                            allTolerance: action.payload
                                                                                        }
                                                                                        case FETCH_SCORE:
                                                                                            return {
                                                                                                ...state,
                                                                                                allScores: action.payload
                                                                                            }
                                                                                            case FETCH_PRINT_REPORT:
                                                                                                return {
                                                                                                    ...state,
                                                                                                    printReport: action.payload
                                                                                                }
                                                                                                case FETCH_ALL_SCOUTS:
                                                                                                    return {
                                                                                                        ...state,
                                                                                                        allScouts: action.payload
                                                                                                    }

                                                                                                    case FETCH_PREVALANCE:
                                                                                                        return {
                                                                                                            ...state,
                                                                                                            prevalence: action.payload
                                                                                                        }
                                                                                                        case FETCH_ALL_SCOUT_PERSONNEL:
                                                                                                            return {
                                                                                                                ...state,
                                                                                                                allScoutPersonnel: action.payload
                                                                                                            }
                                                                                                            case FETCH_BLOCK_DATES:
                                                                                                                return {
                                                                                                                    ...state,
                                                                                                                    blockDates: action.payload
                                                                                                                }
                                                                                                                case FETCH_TIME_REPORT:
                                                                                                                    return {
                                                                                                                        ...state,
                                                                                                                        timeReport: action.payload
                                                                                                                    }

                                                                                                                    case FETCH_VARIETY_REPORT:
                                                                                                                        return {
                                                                                                                            ...state,
                                                                                                                            varietyReport: action.payload
                                                                                                                        }
                                                                                                                        case FETCH_SCOUT_TRACKING:
                                                                                                                            return {
                                                                                                                                ...state,
                                                                                                                                trackingReport: action.payload
                                                                                                                            }
                                                                                                                            case BLOCK_REPORT_PAGINATED:
                                                                                                                                return {
                                                                                                                                    ...state,
                                                                                                                                    blockReportPaginated: action.payload
                                                                                                                                }
                                                                                                                                case FETCH_FARM_BY_DATE:
                                                                                                                                    return {
                                                                                                                                        ...state,
                                                                                                                                        farmReportByDate: action.payload
                                                                                                                                    }
                                                                                                                                    default:
                                                                                                                                        return state;
    }
}