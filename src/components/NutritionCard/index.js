import styled from "styled-components";
import PropTypes from "prop-types";

const NutritionContainer = styled.div`
  background: #fbfbfb;
  width: 258px;
  border-radius: 5px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  padding: 10px;
`;

const NutritionIcon = styled.div`
  background: ${(props) => props.color};
  border-radius: 6px;
  width: 60px;
  height: 60px;
  position: relative;
`;

const NutritionImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const NutritionDetails = styled.div`
  margin-left: 24px;
  span {
    display: block;
  }
  span:nth-child(1) {
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  span:nth-child(2) {
    font-size: 0.8rem;
    color: #74798c;
  }
`;

export default function NutritionCard({ src, title, data, type, color }) {
  return (
    <NutritionContainer>
      <NutritionIcon color={color}>
        <NutritionImg src={src} alt={title} />
      </NutritionIcon>
      <NutritionDetails>
        <span>{data}</span>
        <span>{type}</span>
      </NutritionDetails>
    </NutritionContainer>
  );
}

NutritionCard.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
