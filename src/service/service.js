import { USER_MAIN_DATA as users, USER_ACTIVITY as activities, USER_AVERAGE_SESSIONS as sessions, USER_PERFORMANCE as performances } from "../data";
import { UserActivityFormatted } from "../models/userActivityModel";
import { UserDataFormatted } from "../models/userDataModel";
import { UserPerformanceFormatted } from "../models/userPerformanceModel";
import { UserSessionFormatted } from "../models/userSessionModel";

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

    return [
      new UserDataFormatted(userInfoDataMocked).formatData(),
      new UserPerformanceFormatted(userPerformanceDataMocked).formatData(),
      new UserActivityFormatted(userActivityDataMocked).formatData(),
      new UserSessionFormatted(userSessionDataMocked).formatData(),
    ];
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

  console.log("fetched");

  return [
    new UserDataFormatted(userInfoDataFetched.data).formatData(),
    new UserPerformanceFormatted(userPerformanceDataFetched.data).formatData(),
    new UserActivityFormatted(userActivityDataFetched.data).formatData(),
    new UserSessionFormatted(userSessionDataFetched.data).formatData(),
  ];
}
