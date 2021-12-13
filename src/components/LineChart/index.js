import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const LineChartContainer = styled.div`
  width: 258px;
  height: 263px;
  border-radius: 5px;
  background: #ff0000;
  position: relative;
`;

const LineChartHeader = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  h2 {
    font-size: 15px;
    font-weight: 500;
    margin: 29px 60px 0 29px;
    line-height: 24px;
    color: #fff;
    opacity: 0.5;
  }
`;

const CustomTooltipContainer = styled.div`
  background: #fff;
  color: #000;
  font-size: 12px;
  font-weight: 500;
  font-family: Roboto;
  text-align: center;
  padding: 10px;
`;

export default function Line_Chart({ userSessions }) {
  const { sessions, minY, maxY } = userSessions;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return <CustomTooltipContainer>{`${payload[0].value} min`}</CustomTooltipContainer>;
    }
    return null;
  };

  return (
    <LineChartContainer>
      <LineChartHeader>
        <h2>Durée moyenne des sessions</h2>
      </LineChartHeader>
      {sessions && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={250}
            height={186}
            data={sessions}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.5)" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
            <YAxis hide={true} domain={[minY, maxY]} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="natural"
              dataKey="sessionLength"
              stroke="#fff"
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: "rgba(255, 255, 255, 0.2)",
                strokeWidth: 10,
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </LineChartContainer>
  );
}

Line_Chart.propTypes = {
  userSessions: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        sessionLength: PropTypes.number.isRequired,
      })
    ),
    minY: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired,
  }),
};
