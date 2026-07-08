import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  colors?: string[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function CustomPieChart({ data, colors = DEFAULT_COLORS, height = 200, innerRadius = 0, outerRadius = 80 }: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
          strokeWidth={0}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '12px',
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
