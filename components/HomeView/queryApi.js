export default ({conditionInput, stat, typ, key, minRank, maxRank}) => {
  const condition = conditionInput;
  const status = stat;
  const studyType = typ;
  const keywords = key;
  const fields = 'BriefTitle';

  const rank = ''
  let expression = '';

  const url = `https://clinicaltrials.gov/api/query/study_fields?expr=${expression}&fields=${fields}&${rank}fmt=json`;

  urlResponseJSON = fetch(url);

  console.log(urlResponseJSON);
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