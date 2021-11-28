import { USER_MAIN_DATA as users, USER_ACTIVITY as activities, USER_AVERAGE_SESSIONS as sessions, USER_PERFORMANCE as performances } from "../data";
/*import { UserInfo } from "./userInfo";
import UserPerformance from "./userPerformance";

export const todayScore = users[0].todayScore;

export const activityUser = activities;

export const sessionUser = sessions;

export const performanceUser = performance;

export const getUser = UserInfo(users[1]);

export async function getUserInfo(id, isMocked) {
  if (isMocked) {
    return new Promise((resolve) => resolve(users.find((user) => user.id === parseInt(id))));
  }
  let url = `http://localhost:3008/user/${id}`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log("Error : ", error);
  }
}

export const getPerformance = UserPerformance(performances[1]);

export async function getUserPerformance(id, isMocked) {
  if (isMocked) {
    return new Promise((resolve) => resolve(performances.find((perf) => perf.userId === parseInt(id))));
  }
  let url = `http://localhost:3008/user/${id}/performance`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserSessions(id, isMocked) {
  if (isMocked) {
    return new Promise((resolve) => resolve(sessions.find((session) => session.userId === parseInt(id))));
  }
  let url = `http://localhost:3008/user/${id}/average-sessions`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserActivities(id, isMocked) {
  if (isMocked) {
    return new Promise((resolve) => resolve(activities.find((activity) => activity.userId === parseInt(id))));
  }
  let url = `http://localhost:3008/user/${id}/activity`;
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}*/
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
  const userInfoDataFetched = await userInfoResponse.json();
  const userPerformanceDataFetched = await userPerformanceResponse.json();
  const userActivityDataFetched = await userActivityResponse.json();
  const userSessionDataFetched = await userSessionResponse.json();
  console.log("fetched");

  return [userInfoDataFetched, userPerformanceDataFetched, userActivityDataFetched, userSessionDataFetched];
}
