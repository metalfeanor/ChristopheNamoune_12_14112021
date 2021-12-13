/**
 * * Formatted Data of user for BarChart component
 */
export class UserActivityFormatted {
  constructor(userSession) {
    this.userSession = userSession;
  }

  formatData() {
    const { userId, sessions } = this.userSession;

    //    Replace date of day by number of the day into session array

    for (let i = 0; i < sessions.length; i++) {
      sessions[i].day = i + 1;
    }

    //   define min and max value to display barChart graph
    let kilogramsArray = sessions.map((item) => item.kilogram);
    let minYKilo = Math.min(...kilogramsArray) - 1;
    let maxYKilo = Math.max(...kilogramsArray) + 1;

    let caloriesArray = sessions.map((item) => item.calories);
    let minYCal = Math.min(...caloriesArray) - 10;
    let maxYCal = Math.max(...caloriesArray) + 10;

    let response = { userId, sessions, minYKilo, maxYKilo, minYCal, maxYCal };

    return response;
  }
}
