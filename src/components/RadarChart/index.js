import { useEffect } from "react";
import styled from "styled-components";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const RadarContainer = styled.div`
  width: 258px;
  height: 263px;
  border-radius: 5px;
  background: #282d30;
`;

export default function ChartRadar({ performance }) {
  const { kind, data } = performance;

  const getOrganizedDataForRadarChart = (data, kind) => {
    if (!data) {
      data = {};
      return data;
    }

    for (let i = 0; i < data.length; i++) {
      data[i].kind = kind[i + 1];
    }
    return data;
  };

  useEffect(() => {
    getOrganizedDataForRadarChart(data, kind);
  });

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
