import styled from "styled-components";
import { SelectedLink } from "../../utils/style/GlobalStyle";
import { Link } from "react-router-dom";
import { variables } from "../../utils/variables";
import { useContext } from "react";
import { MockedContext } from "../../utils/contexts/MockedContext";

import { ReactComponent as Logo } from "../../assets/logo.svg";

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const LeftCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background-color: ${variables.backgroundColor};
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 2;
  height: 100%;
`;

const ChooseData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 25px;
`;
const DataModeButton = styled.button`
  background-color: transparent;
  border: 2px solid grey;
  border-radius: 4px;
  cursor: pointer;
  color: #8186a0;
`;

function Home() {
  const { isDataMocked, setIsDataMocked } = useContext(MockedContext);
  console.log(isDataMocked);

  const size = "150px";
  return (
    <HomeWrapper>
      <LeftCol>
        <Link to="/">
          <Logo src={Logo} width={size} height={size} />
        </Link>
      </LeftCol>
      <RightCol>
        <ChooseData>
          Données Mockées ?<DataModeButton onClick={() => setIsDataMocked(!isDataMocked)}>{isDataMocked === true ? "✅" : "❌"}</DataModeButton>
        </ChooseData>
        <SelectedLink to="/user/18">Cecilia</SelectedLink>
        <SelectedLink to="/user/12">Karl</SelectedLink>
      </RightCol>
    </HomeWrapper>
  );
}

export default Home;
