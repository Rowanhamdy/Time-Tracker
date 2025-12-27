import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../layout/Card";

export default function PieChartCard({ title, data, dataKey, nameKey, colors }) {
  return (
    <Card title={title} className="flex flex-col items-center">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={110}>
            {data.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}
