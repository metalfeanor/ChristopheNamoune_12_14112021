import styled from "styled-components";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import PropTypes from "prop-types";

const RadarContainer = styled.div`
  width: 258px;
  height: 263px;
  border-radius: 5px;
  background: #282d30;
`;

export default function ChartRadar({ performance }) {
  const { data } = performance;

  return (
    <RadarContainer>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="48%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="kind" stroke="#fff" tickLine={false} tick={{ fontSize: 10 }} />
            <Radar dataKey="value" stroke="#ff0101" fill="#ff0101" fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </RadarContainer>
  );
}

ChartRadar.propTypes = {
  performance: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        kind: PropTypes.string.isRequired,
      })
    ),
  }),
};
