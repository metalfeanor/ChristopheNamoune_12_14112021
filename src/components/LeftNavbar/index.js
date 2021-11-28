import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../utils/style/GlobalStyle";
import { variables } from "../../utils/variables";

import { ReactComponent as Yoga } from "../../assets/yoga.svg";
import { ReactComponent as Swim } from "../../assets/swim.svg";
import { ReactComponent as Cycle } from "../../assets/cycle.svg";
import { ReactComponent as Weight } from "../../assets/weight.svg";

const IconContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 126vh;
  @media screen and (min-width: 1350px) {
    height: 95vh;
  }
  width: ${variables.padding};
  bottom: 0;
  left: 0;
  top: 120px;
  justify-content: space-between;
  padding-top: 50px;
  align-items: center;
  background-color: black;
`;

const TextDiv = styled.div`
  position: absolute;
  bottom: 100px;
  width: 138px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  transform: rotate(-90deg);
`;

function LeftNavbar() {
  const year = new Date().getFullYear();
  return (
    <LeftContainer>
      <IconContainer>
        <Link to="/">
          <Button>
            <Yoga src={Yoga} />
          </Button>
        </Link>
        <Link to="/">
          <Button>
            <Swim src={Swim} />
          </Button>
        </Link>
        <Link to="/">
          <Button>
            <Cycle src={Cycle} />
          </Button>
        </Link>
        <Link to="/">
          <Button>
            <Weight src={Weight} />
          </Button>
        </Link>
      </IconContainer>
      <TextDiv>Copyright, SportSee {year}</TextDiv>
    </LeftContainer>
  );
}

export default LeftNavbar;
