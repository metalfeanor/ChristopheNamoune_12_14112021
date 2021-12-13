/**
 * * Formatted Data of user for Dashbooard & KPIChart components
 */

export class UserDataFormatted {
  constructor(userData) {
    this.userData = userData;
  }

  formatData() {
    const { id, userInfos, todayScore, score, keyData } = this.userData;

    let data = [];
    //data array is used in KPIChart component
    if (score) {
      data = [{ value: score }, { value: 1 - score }];
    } else {
      data = [{ value: todayScore || score }, { value: 1 - todayScore }];
    }

    let response = { id, userInfos, todayScore: todayScore || score, keyData, data };

    return response;
  }
}
