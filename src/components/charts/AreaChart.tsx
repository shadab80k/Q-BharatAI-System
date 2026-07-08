import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  xAxisKey: string;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  height?: number;
}

export default function CustomAreaChart({ data, dataKey, xAxisKey, color = '#2563EB', gradientFrom = '#2563EB', gradientTo = '#2563EB', height = 200 }: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.3} />
            <stop offset="95%" stopColor={gradientTo} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
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
        />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#gradient-${dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
