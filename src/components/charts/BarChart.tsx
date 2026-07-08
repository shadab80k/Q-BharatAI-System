import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BarChartProps {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  colors?: string[];
  height?: number;
  showGrid?: boolean;
}

export default function CustomBarChart({ data, dataKey, xAxisKey, color = '#2563EB', colors, height = 200, showGrid = true }: BarChartProps) {
  const barColors = colors || [color];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />}
        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '12px',
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
        />
        <Bar dataKey={dataKey} radius={[4, 4, 0, 0]} maxBarSize={40}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
