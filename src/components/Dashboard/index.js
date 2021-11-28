import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { MockedContext } from "../../utils/contexts/MockedContext";

import { fetchAllApiData } from "../../service/service";
import apple from "../../assets/apple.png";
import fire from "../../assets/fire.png";
import chicken from "../../assets/chicken.png";
import cheeseburger from "../../assets/cheeseburger.png";
//import { getUserActivities, getUserInfo, getUserPerformance, getUserSessions } from "../../service/service";

import styled from "styled-components";
import KPIChart from "../KPIChart";
import RadarChart from "../RadarChart";
import LineChart from "../LineChart";
import BarChart from "../BarChart";
import { Loader } from "../../utils/style/GlobalStyle";
import NutritionCard from "../NutritionCard";

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const DashboardContainer = styled.div`
  padding-left: 14%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 1350px) {
    flex-direction: row;
  }
  section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 835px;
  }
  aside {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 835px;
    @media screen and (min-width: 1350px) {
      flex-direction: column;
      margin-left: 60px;
    }
    > div {
      margin: 20px 5px;
    }
  }
`;
const Name = styled.span`
  color: #ff0000;
`;

export default function Dashboard() {
  const { isDataMocked } = useContext(MockedContext);
  const [userData, setUserData] = useState({});
  const [userDataPerf, setUserDataPerf] = useState({});
  const [userSession, setUserSession] = useState({});
  const [userActivity, setUserActivity] = useState({});

  const [isDataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getAllData() {
      setDataLoading(true);
      try {
        fetchAllApiData(id, isDataMocked).then(
          isDataMocked
            ? ([userInfoDataMocked, userPerformanceDataMocked, userActivityDataMocked, userSessionDataMocked]) => {
                //console.log(userInfoDataMocked, userPerformanceDataMocked, userActivityDataMocked, userSessionDataMocked);
                setUserData(userInfoDataMocked);
                setUserDataPerf(userPerformanceDataMocked);
                setUserActivity(userActivityDataMocked);
                setUserSession(userSessionDataMocked);
              }
            : ([userInfoDataFetched, userPerformanceDataFetched, userActivityDataFetched, userSessionDataFetched]) => {
                //console.log(userInfoDataFetched.data, userPerformanceDataFetched.data, userActivityDataFetched.data, userSessionDataFetched.data);
                setUserData(userInfoDataFetched.data);
                setUserDataPerf(userPerformanceDataFetched.data);
                setUserActivity(userActivityDataFetched.data);
                setUserSession(userSessionDataFetched.data);
              }
        );
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    getAllData();
    /*getUserInfo(id, isDataMocked).then((data) => {
        !data ? setDataLoading(true) : setUserData(data.data);
      });
      getUserPerformance(id, isDataMocked).then((data) => {
        !data ? setDataLoading(true) : setUserDataPerf(data.data);
      });
      getUserActivities(id, isDataMocked).then((data) => {
        !data ? setDataLoading(true) : setUserActivity(data.data);
      });
      getUserSessions(id, isDataMocked).then((data) => {
        !data ? setDataLoading(true) : setUserSession(data.data);
      });*/
  }, [id, isDataMocked]);

  // const userRes = (id) => {
  //   getUserInfo(id, isDataMocked).then((user) => {
  //     setUserData(user);
  //   });
  // };
  // userRes(id);
  /*let firstName = "";
  userData.userInfos ? (firstName = userData.userInfos.firstName) : (firstName = "");*/

  //console.log(isDataMocked, id, userData, userDataPerf, isDataLoading, userActivity, userSession);
  //console.log(userActivity, userDataPerf);

  if (error) {
    return <span>Oups il y a eu un problème</span>;
  }

  return (
    <div>
      {isDataLoading ? (
        <Loader />
      ) : (
        <DashboardContainer>
          <Header>
            <h1>
              Bonjour <Name>{userData.userInfos ? userData.userInfos.firstName : ""}</Name>
            </h1>
            <span>Félicitation ! Vous avez explosé vos objectifs hier 👏</span>
          </Header>
          <MainContainer>
            <section>
              <BarChart activity={userActivity} />
              <LineChart userSessions={userSession} />
              <RadarChart performance={userDataPerf} />
              <KPIChart kpi={userData} />
            </section>
            <aside>
              <NutritionCard
                src={fire}
                title="Energy"
                data={`${userData.keyData ? userData.keyData.calorieCount : ""}kCal`}
                type="Calories"
                color="#fbeaea"
              />
              <NutritionCard
                src={chicken}
                title="Protéines"
                data={`${userData.keyData ? userData.keyData.proteinCount : ""}g`}
                type="Protéines"
                color="#e9f4fb"
              />
              <NutritionCard
                src={apple}
                title="Glucides"
                data={`${userData.keyData ? userData.keyData.carbohydrateCount : ""}g`}
                type="Glucides"
                color="#fbf6e5"
              />
              <NutritionCard
                src={cheeseburger}
                title="Lipides"
                data={`${userData.keyData ? userData.keyData.lipidCount : ""}g`}
                type="Lipides"
                color="#fbeaef"
              />
            </aside>
          </MainContainer>
        </DashboardContainer>
      )}
    </div>
  );
}
