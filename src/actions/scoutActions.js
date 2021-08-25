import {
  FETCH_SCOUT,
  GET_ERRORS,
  CREATE_SCOUT,
  UPDATE_SCOUT,
  DELETE_SCOUT,
  FETCH_PLANT,
  FETCH_ENTRY,
  FETCH_ALL_ENTRIES,
  FETCH_POINT,
  FETCH_ISSUE,
  FETCH_ISSUE_CATEGORY,
  FETCH_FARM,
  BLOCK_REPORT,
  BED_REPORT,
  ENTRY_REPORT,
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
} from "./types";
import {
  axios,
  createError
} from "../utils";

//Fetch Scout
export const fetchScout = (
  page,
  limit,
  date,
  entry,
  point,
  issue,
  block,
  bed,
  variety,
  issueCategory,
  tolerance,
  value,
  latitude,
  longitude,
  scout_personnel,
  score,
  issue_type
) => dispatch => {
  let url = `/scout`;
  url += `?page=${page}&limit=${limit}`;
  if (date !== "") {
    url += `&date=${date}`;
  }

  if (entry !== "") {
    url += `&entry=${entry}`;
  }

  if (point !== "") {
    url += `&point=${point}`;
  }

  if (issue !== "") {
    url += `&issue=${issue}`;
  }

  if (block !== "") {
    url += `&block=${block}`;
  }

  if (bed !== "") {
    url += `&bed=${bed}`;
  }

  if (variety !== "") {
    url += `&variety=${variety}`;
  }

  if (issueCategory !== "") {
    url += `&issueCategory=${issueCategory}`;
  }

  if (tolerance !== "") {
    url += `&tolerance=${tolerance}`;
  }

  if (value !== "") {
    url += `&value=${value}`;
  }

  if (latitude !== "") {
    url += `&latitude=${latitude}`;
  }
  if (longitude !== "") {
    url += `&longitude=${longitude}`;
  }
  if (scout_personnel !== "") {
    url += `&scout_personnel=${scout_personnel}`;
  }
  if (score !== "") {
    url += `&score=${score}`;
  }
  if (issue_type !== "") {
    url += `&issue_type=${issue_type}`;
  }
  return axios
    .get(url)
    .then(scout => {
      dispatch({
        type: FETCH_SCOUT,
        payload: scout.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Create Scout
export const createScout = scoutDetails => dispatch => {
  let url = `scout`;
  axios
    .post(url, scoutDetails)
    .then(scout => {
      dispatch({
        type: CREATE_SCOUT,
        payload: scout.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Edit Scout
export const updateScout = (_id, scoutDetails) => dispatch => {
  let url = `scout/${_id}`;
  axios
    .patch(url, scoutDetails)
    .then(scout => {
      dispatch({
        type: UPDATE_SCOUT,
        payload: scout.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Delete Scout
export const deleteScout = _id => dispatch => {
  let url = `scout/${_id}`;
  axios
    .delete(url)
    .then(scout => {
      dispatch({
        type: DELETE_SCOUT,
        payload: scout.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Plant
export const fetchPlant = () => dispatch => {
  let url = `/plant/all`;
  axios
    .get(url)
    .then(plant => {
      dispatch({
        type: FETCH_PLANT,
        payload: plant.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Entry
export const fetchEntry = () => dispatch => {
  let url = `/entry`;
  axios
    .get(url)
    .then(entry => {
      dispatch({
        type: FETCH_ENTRY,
        payload: entry.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Point
export const fetchPoint = () => dispatch => {
  let url = `/point`;
  axios
    .get(url)
    .then(point => {
      dispatch({
        type: FETCH_POINT,
        payload: point.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Issue
export const fetchIssue = () => dispatch => {
  let url = `/issue/all`;
  axios
    .get(url)
    .then(issue => {
      dispatch({
        type: FETCH_ISSUE,
        payload: issue.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Issue Category
export const fetchIssueCategory = () => dispatch => {
  let url = `/issue-category/all`;
  axios
    .get(url)
    .then(issueCategory => {
      dispatch({
        type: FETCH_ISSUE_CATEGORY,
        payload: issueCategory.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Farm Visual Reporting
export const farmReport = () => dispatch => {
  let url = `/scout/tolerance/farm`;
  axios
    .get(url)
    .then(farm => {
      dispatch({
        type: FETCH_FARM,
        payload: farm.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch Farm Visual Reporting by date
export const farmReportByDate = (date) => dispatch => {
  let url = `/scout/tolerance/farm/block-view`;
  if (date !== "") {
    url += `?date=${date}`;
  }
  axios
    .get(url)
    .then(farm => {
      console.log(farm.data);
      dispatch({
        type: FETCH_FARM_BY_DATE,
        payload: farm.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Fetch Block Visual Report
export const fetchBlockReport = (block, date) => dispatch => {
  let url = `scout/tolerance/block`;
  if (block !== "") {
    url += `?block=${block}`;
  }
  if (date !== "") {
    url += `&date=${date}`;
  }

  axios
    .get(url)
    .then(blocReport => {
      dispatch({
        type: BLOCK_REPORT,
        payload: blocReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Fetch Block Visual Report Paginated
export const fetchBlockReportPaginated = (page, limit, block) => dispatch => {
  let url = `scout/tolerance/block/paginated`;
  if (page !== "") {
    url += `?page=${page}`;
  }

  if (limit !== "") {
    url += `&limit=${limit}`;
  }
  if (block !== "") {
    url += `&block=${block}`;
  }

  axios
    .get(url)
    .then(blocReport => {
      dispatch({
        type: BLOCK_REPORT_PAGINATED,
        payload: blocReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};


//Fetch Bed Visual Report
export const fetchBedReport = (bed, created) => dispatch => {
  let url = `scout/entry/all`;

  if (bed !== "") {
    url += `?bed=${bed}`;
  }
  if (created !== "") {
    url += `&created=${created}`;
  }
  axios
    .get(url)
    .then(bedReport => {
      dispatch({
        type: BED_REPORT,
        payload: bedReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};
//Fetch Entry Visual Report
export const fetchEntryReport = (entry, bed, date) => dispatch => {
  let url = `scout/tolerance/entry`;

  if (entry !== "") {
    url += `?entry=${entry}`;
  }
  if (bed !== "") {
    url += `&bed=${bed}`;
  }
  if (bed !== "") {
    url += `&date=${date}`;
  }
  axios
    .get(url)
    .then(entryReport => {
      dispatch({
        type: ENTRY_REPORT,
        payload: entryReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Entry
export const fetchAllEntries = () => dispatch => {
  let url = `/entry/all`;
  axios
    .get(url)
    .then(entry => {
      dispatch({
        type: FETCH_ALL_ENTRIES,
        payload: entry.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch bed scouting date
export const fetchBedDate = bed => dispatch => {
  let url = `/scout/bed/entry/date`;
  if (bed !== "") {
    url += `?bed=${bed}`;
  }
  axios
    .get(url)
    .then(date => {
      dispatch({
        type: FETCH_BED_DATE,
        payload: date.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Blocks
export const fetchAllBlocks = () => dispatch => {
  let url = `/block/all`;
  axios
    .get(url)
    .then(block => {
      dispatch({
        type: FETCH_SCOUT_BLOCKS,
        payload: block.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Beds
export const fetchAllBeds = () => dispatch => {
  let url = `/bed/all`;
  axios
    .get(url)
    .then(bed => {
      dispatch({
        type: FETCH_ALL_BEDS,
        payload: bed.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Variety
export const fetchAllVariety = () => dispatch => {
  let url = `/variety/all`;
  axios
    .get(url)
    .then(variety => {
      dispatch({
        type: FETCH_ALL_VARIETY,
        payload: variety.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Personnel(scouts)
export const fetchAllPersonnel = () => dispatch => {
  let url = `scout/scout-personnel/all`;
  console.log('its getting here')
  axios
    .get(url)
    .then(scout => {
      console.log(scout.data)
      dispatch({
        type: FETCH_ALL_SCOUT_PERSONNEL,
        payload: scout.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch AllBlockDates
export const fetchAllBlockDates = block => dispatch => {
  let url = `scout/block/entry/date`;
  if (block !== "") {
    url += `?block=${block}`;
  }
  axios
    .get(url)
    .then(blockDate => {
      dispatch({
        type: FETCH_BLOCK_DATES,
        payload: blockDate.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All IssueType
export const fetchAllIssueType = () => dispatch => {
  let url = `/issue-type/all`;
  axios
    .get(url)
    .then(variety => {
      dispatch({
        type: FETCH_ALL_ISSUE_TYPES,
        payload: variety.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Tolerance
export const fetchAllTolerance = () => dispatch => {
  let url = `/tolerance`;
  axios
    .get(url)
    .then(tolerance => {
      dispatch({
        type: FETCH_TOLERANCE,
        payload: tolerance.data.items
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//Fetch All Score
export const fetchAllScore = () => dispatch => {
  let url = `/score`;
  axios
    .get(url)
    .then(score => {
      dispatch({
        type: FETCH_SCORE,
        payload: score.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

//fetch print report
export const fetchPrintReport = (
  block,
  variety,
  created_by,
  created,
  issue
) => dispatch => {
  let url = `/scout/bed/entry/report`;
  if (block !== "") {
    url += `?block=${block}`;
  }
  if (variety !== "") {
    url += `&variety=${variety}`;
  }
  if (created_by !== "") {
    url += `&created_by=${created_by}`;
  }
  if (created !== "") {
    url += `&created=${created}`;
  }
  if (issue !== "") {
    url += `&issue=${issue}`;
  }
  axios
    .get(url)
    .then(printReport => {
      dispatch({
        type: FETCH_PRINT_REPORT,
        payload: printReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Fetch all scouts
export const fetchAllScouts = () => dispatch => {
  let url = `scout/all`;
  return axios
    .get(url)
    .then(scouts => {
      console.log(scouts.data)
      dispatch({
        type: FETCH_ALL_SCOUTS,
        payload: scouts.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch prevalance
export const fetchPrevalence = (
  sdate,
  edate,
  block,
  variety,
  issue
) => dispatch => {
  let url = `scout/farm/prevalence/`;
  if (sdate !== "") {
    url += `?sdate=${sdate}`;
  }
  if (edate !== "") {
    url += `&edate=${edate}`;
  }
  if (block !== "") {
    url += `&block=${block}`;
  }
  if (variety !== "") {
    url += `&variety=${variety}`;
  }
  if (issue !== "") {
    url += `&issue=${issue}`;
  }

  axios
    .get(url)
    .then(res => {
      dispatch({
        type: FETCH_PREVALANCE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Fetch scout time-report
export const fetchTimeReport = (date, block) => dispatch => {
  let url = `scout/time-report`;
  if (date !== "") {
    url += `?date=${date}`;
  }
  if (block !== "") {
    url += `&block=${block}`;
  }
  axios
    .get(url)
    .then(res => {
      dispatch({
        type: FETCH_TIME_REPORT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// fetch variety report
export const fetchVarietyReport = (block, created) => dispatch => {
  let url = `scout/tolerance/farm/variety/`;
  if (block !== "") {
    url += `?block=${block}`;
  }
  if (created !== "") {
    url += `&created=${created}`;
  }
  axios
    .get(url)
    .then(variety => {
      dispatch({
        type: FETCH_VARIETY_REPORT,
        payload: variety.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};

// Fetch Block Visual Report
export const fetchTrackingReport = (date, create_by, block) => dispatch => {
  console.log('here');
  let url = `scout/location`;
  // 5d50182b8dd94830b06471d0
  if (date !== "") {
    url += `?date=${date}`;
  }

  if (create_by !== "") {
    url += `&created_by=${create_by}`;
  }
  if (block !== "") {
    url += `&block=${block}`;
  }


  axios
    .get(url)
    .then(trackingReport => {
      console.log(trackingReport.data)
      dispatch({
        type: FETCH_SCOUT_TRACKING,
        payload: trackingReport.data
      });
    })
    .catch(err => {
      dispatch(createError(err, GET_ERRORS));
    });
};