/**
 * * Formatted Data of user for RadarChart component
 */
export class UserPerformanceFormatted {
  constructor(userActivity) {
    this.userActivity = userActivity;
  }

  formatData() {
    const { userId, data } = this.userActivity;

    //Modify text into kind object
    const kind = {
      1: "Cardio",
      2: "Energie",
      3: "Endurance",
      4: "Force",
      5: "Vitesse",
      6: "Intensité",
    };

    for (let i = 0; i < data.length; i++) {
      data[i].kind = kind[i + 1];
    }

    //reorganized data array to match figma model
    data.reverse();

    let response = { userId, kind, data };

    return response;
  }
}
