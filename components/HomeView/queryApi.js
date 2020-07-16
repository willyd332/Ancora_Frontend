const fetch = require('node-fetch');

const createKeywordQuery = (keywords) => {
  const arr = keywords.split(', ');
  let keywordStr = '';
  arr.forEach((word, index) => {
    if (index < arr.length - 1) {
      keywordStr = keywordStr + word + ' OR ';
    } else {
      keywordStr = keywordStr + word;
    }
  });
  return keywordStr;
};

export default async (conditionInput, stat, typ, key, minRank, maxRank) => {
  const condition =
    conditionInput === '' ? '' : `AREA[ConditionSearch]"${conditionInput}"`;

  const status = stat === 'Any Status' ? '' : `AREA[OverallStatus]"${stat}"`;

  const studyType = typ === 'Any Type' ? '' : `AREA[StudyType]"${typ}"`;

  const keywords = key;

  const keywordsQuery = createKeywordQuery(keywords);

  const fields =
    'BriefTitle,BriefSummary,Condition,EligibilityCriteria,OfficialTitle,NCTId,OverallStatus';

  const rank = `min_rnk=${minRank}&max_rnk=${maxRank}`;

  let expression = `${condition}${status === '' ? '' : ' AND ' + status}${
    studyType === '' ? '' : ' AND ' + studyType
  }`;

  if (keywordsQuery.length > 0) {
    const keywordsString = `AREA[BasicSearch](${keywordsQuery})`;
    expression = expression + ` AND ${keywordsString}`;
  }

  const url = `https://clinicaltrials.gov/api/query/study_fields?expr=${expression}&fields=${fields}&${rank}&fmt=json`;

  const urlResponseJSON = await fetch(url);

  const response = await urlResponseJSON.json();

  return response;
};

// AREAS

// OverallStatus
// ConditionSearch
// BasicSearch
// StudyType

// AREA[InterventionName]aspirin

// expr=AREA[ConditionSearch]"condition" AND AREA[OverallStatus]"status" AND AREA[StudyType]"studyType" AND AREA[BasicSearch](keywordsList)

// colorado free newyork

/*
AREA[ConditionSearch]"condition" AND AREA[OverallStatus]"status" AND AREA[StudyType]"studyType" AND AREA[BasicSearch](keywordsList)


AREA[ConditionSearch]"heart attack" AND AREA[OverallStatus]"completed" AND AREA[StudyType]"observational" AND AREA[BasicSearch](boston OR phase 1)

https://clinicaltrials.gov/api/query/study_fields?expr=AREA[ConditionSearch]"heart attack" AND AREA[OverallStatus]"completed" AND AREA[StudyType]"observational" AND AREA[BasicSearch](boston OR phase 1)&fields=BriefTitle%2COverallStatus%2CLocationCity&min_rnk=1&max_rnk=10&fmt=json


*/
