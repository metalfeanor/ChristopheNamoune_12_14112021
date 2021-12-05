import styled from "styled-components";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";

const KpiContainer = styled.div`
  width: 258px;
  height: 263px;
  border-radius: 5px;
  background: #fbfbfb;
`;

const KpiHeader = styled.header`
  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    margin: 24px 0 0 30px;
    color: #20253a;
  }
`;

export default function KPIChart({ kpi }) {
  const todayScore = kpi.todayScore;
  const score = kpi.score;
  const data = [{ value: todayScore || score }, { value: 1 - todayScore || 1 - score }];

  /**
   * Modify position of data to display
   * @param {*} props
   * @returns
   */
  const CustomizedLabel = (props) => {
    const { value, viewBox } = props;
    const { cx, cy } = viewBox;
    return (
      <g>
        <text x={cx - 15} y={cy - 5} fill="#282d30" fontSize="26px" fontWeight="700">
          {`${value * 100}%`}
        </text>
        <text x={cx - 20} y={cy + 15} fill="#74798c" fontSize="16px" fontWeight="500">
          de votre
        </text>
        <text x={cx - 20} y={cy + 35} fill="#74798c" fontSize="16px" fontWeight="500">
          objectif
        </text>
      </g>
    );
  };

  return (
    <KpiContainer>
      <KpiHeader>
        <h2>Score</h2>
      </KpiHeader>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart width={250} height={180}>
          <Pie data={data} cx="50%" cy="50%" dataKey="value" innerRadius={70} outerRadius={80} startAngle={90} cornerRadius={40}>
            {data.map((entry, index) => {
              if (index === 1) {
                return <Cell key={`cell-${index}`} fill="#fbfbfb" />;
              }
              return <Cell key={`cell-${index}`} fill="#ff0000" />;
            })}
            <Label content={<CustomizedLabel value={data[0].value} />} position="center" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </KpiContainer>
  );
}
