/**
 * Service to handle the fetched data (user info)
 * @param   {object}  dataFetched   The data from the API or data Mocked
 * @return  {object}                The formatted data for the front
 */

export function UserInfo(dataFetched) {
  const { id, userInfos, todayScore, score, keyData } = dataFetched;
  const { firstName, lastName, age } = userInfos;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;

  const personalInfo = { firstName, lastName, age };
  const keyDataInfo = { calorieCount, proteinCount, carbohydrateCount, lipidCount };

  let response = { id, todayScore: todayScore || undefined, score: score || undefined, personalInfo, keyDataInfo };

  return response;
}
