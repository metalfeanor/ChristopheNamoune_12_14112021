import { USER_MAIN_DATA as users, USER_ACTIVITY as activities, USER_AVERAGE_SESSIONS as sessions, USER_PERFORMANCE as performances } from "../data";

/**
 *  Fetch user Infos, Performance, Average Session and Activity
 *  from API or Data Mocked to create graph for users
 * @param {integer} id User id
 * @param {boolean} isMocked use Mocked Data or Not
 * @returns {Array}
 */
export async function fetchAllApiData(id, isMocked) {
  if (isMocked) {
    console.log("mocked");

    const userInfoDataMocked = users.find((user) => user.id === parseInt(id));
    const userPerformanceDataMocked = performances.find((perf) => perf.userId === parseInt(id));
    const userActivityDataMocked = activities.find((activity) => activity.userId === parseInt(id));
    const userSessionDataMocked = sessions.find((session) => session.userId === parseInt(id));

    return [userInfoDataMocked, userPerformanceDataMocked, userActivityDataMocked, userSessionDataMocked];
  }

  let userUrl = `http://localhost:3008/user/${id}`;
  let performanceUrl = `http://localhost:3008/user/${id}/performance`;
  let sessionUrl = `http://localhost:3008/user/${id}/average-sessions`;
  let activityUrl = `http://localhost:3008/user/${id}/activity`;
  const [userInfoResponse, userPerformanceResponse, userActivityResponse, userSessionResponse] = await Promise.all([
    fetch(userUrl),
    fetch(performanceUrl),
    fetch(activityUrl),
    fetch(sessionUrl),
  ]);
  const [userInfoDataFetched, userPerformanceDataFetched, userActivityDataFetched, userSessionDataFetched] = await Promise.all([
    userInfoResponse.json(),
    userPerformanceResponse.json(),
    userActivityResponse.json(),
    userSessionResponse.json(),
  ]);
  /*const userInfoDataFetched = await userInfoResponse.json();
  const userPerformanceDataFetched = await userPerformanceResponse.json();
  const userActivityDataFetched = await userActivityResponse.json();
  const userSessionDataFetched = await userSessionResponse.json();*/
  console.log("fetched");

  return [userInfoDataFetched, userPerformanceDataFetched, userActivityDataFetched, userSessionDataFetched];
}
