/**
 * * Formatted Data of user for LineChart component
 */
export class UserSessionFormatted {
  constructor(userSession) {
    this.userSession = userSession;
  }

  formatData() {
    const { userId, sessions } = this.userSession;

    //    Replace number of day by Letter of the day into session object
    const day = {
      1: "L",
      2: "M",
      3: "M",
      4: "J",
      5: "V",
      6: "S",
      7: "D",
    };

    for (let i = 0; i < sessions.length; i++) {
      sessions[i].day = day[i + 1];
    }

    //   define min and max value to display barChart graph
    let sessionArray = sessions.map((item) => item.sessionLength);
    let minY = Math.min(...sessionArray) / 2 - 2;
    let maxY = Math.max(...sessionArray) * 2;

    let response = { userId, sessions, minY, maxY };

    return response;
  }
}
