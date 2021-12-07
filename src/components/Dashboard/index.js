import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { MockedContext } from "../../utils/contexts/MockedContext";

import { fetchAllApiData } from "../../service/service";
import apple from "../../assets/apple.png";
import fire from "../../assets/fire.png";
import chicken from "../../assets/chicken.png";
import cheeseburger from "../../assets/cheeseburger.png";

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
const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 126vh;
  @media screen and (min-width: 1350px) {
    height: 70vh;
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

  const [isDataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getAllData() {
      setDataLoading(true);
      try {
        const response = await fetchAllApiData(id, isDataMocked);
        const [userInfoData, userPerformanceData, userActivityData, userSessionData] = response;
        if (isDataMocked) {
          setUserData(userInfoData);
          setUserDataPerf(userPerformanceData);
          setUserActivity(userActivityData);
          setUserSession(userSessionData);
        } else {
          setUserData(userInfoData.data);
          setUserDataPerf(userPerformanceData.data);
          setUserActivity(userActivityData.data);
          setUserSession(userSessionData.data);
        }
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setDataLoading(false);
      }
    }
    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <CenterContainer>Oups il y a eu un problème !</CenterContainer>;
  }

  return (
    <div>
      {isDataLoading ? (
        <CenterContainer>
          <Loader />
        </CenterContainer>
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
