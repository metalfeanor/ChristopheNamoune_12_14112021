import styled from "styled-components";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const BarChartContainer = styled.div`
  background: #fbfbfb;
  width: 835px;
  height: 320px;
  border-radius: 5px;
  padding: 24px 0;
  margin-bottom: 28px;
  .axis {
    color: #9b9eac;
    font-weight: 500;
    font-size: 1rem;
  }
`;

const BarChartHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-weight: 500;
    font-size: 15px;
  }
  .barChartUnits {
    display: flex;
  }
  .header-item {
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #74798c;
    margin-left: 30px;
  }
`;

const RoundDiv = styled.div`
  background: ${(props) => props.color};
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin: 0 10px;
`;

const CustomTooltipContainer = styled.div`
  background: #e60000;
  padding: 0 10px;
`;

const StyledSpan = styled.span`
  display: block;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  font-family: Roboto;
  text-align: center;
  padding: 10px 0;
`;

export default function UserBarChart({ activity }) {
  const { sessions, minYKilo, maxYKilo, minYCal, maxYCal } = activity;

  /**
   * Custom Tooltip to display kg & kcal
   * for each Bar into BarChart with same
   * style from figma
   * @param {*} param0
   * @returns
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltipContainer>
          <StyledSpan>{`${payload[0].value} kg`}</StyledSpan>
          <StyledSpan>{`${payload[1].value} kcal`}</StyledSpan>
        </CustomTooltipContainer>
      );
    }
    return null;
  };

  return (
    <BarChartContainer>
      <BarChartHeader>
        <h2>Activité quotidienne</h2>
        <div className="barChartUnits">
          <div className="header-item">
            <RoundDiv color="#000" />
            <span>Poids (kg)</span>
          </div>
          <div className="header-item">
            <RoundDiv color="#e60000" />
            <span>Calories brûlées (kCal)</span>
          </div>
        </div>
      </BarChartHeader>
      {sessions && (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={770}
            height={270}
            data={sessions}
            margin={{
              top: 50,
              right: 10,
              left: 40,
              bottom: 5,
            }}
            barCategoryGap={35}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis
              yAxisId="kilo"
              orientation="right"
              interval="number"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 14 }}
              domain={[minYKilo, maxYKilo]}
            />
            <YAxis yAxisId="cal" hide={true} domain={[minYCal, maxYCal]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="kilo" dataKey="kilogram" fill="#000" radius={[50, 50, 0, 0]} />
            <Bar yAxisId="cal" dataKey="calories" fill="#e60000" radius={[50, 50, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </BarChartContainer>
  );
}

UserBarChart.propTypes = {
  activity: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.number.isRequired,
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
      })
    ),
    minYKilo: PropTypes.number.isRequired,
    maxYKilo: PropTypes.number.isRequired,
    minYCal: PropTypes.number.isRequired,
    maxYCal: PropTypes.number.isRequired,
  }),
};
