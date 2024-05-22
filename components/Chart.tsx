'use client';

import { Analysis } from '@prisma/client';
import { LineChart, ResponsiveContainer, XAxis, Line, Tooltip, TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<number, string> {
  label?: Date;
  active?: boolean;
}

type CustomXTickProps = {
  x: number;
  y: number;
  payload: { value: Date };
};

const CustomTooltip = ({ payload, label, active }: CustomTooltipProps) => {
  if (!payload || !label) return;

  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (active) {
    const analysis = payload[0].payload;
    return (
      <div className='p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative'>
        <div className='absolute left-2 top-2 w-2 h-2 rounded-full' style={{ background: analysis.color }}></div>
        <p className='label text-sm '>{dateLabel}</p>
        <p className='intro text-xl uppercase'>{analysis.mood}</p>
      </div>
    );
  }
};

const CustomXTick = ({ x, y, payload }: CustomXTickProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='end' fill='#666'>
        {payload.value.toDateString()}
      </text>
    </g>
  );
};

const Chart = ({ analysis }: { analysis: Analysis[] }) => {
  return (
    <ResponsiveContainer width='70%' height='50%'>
      <LineChart width={500} height={300} data={analysis}>
        <XAxis dataKey='createdAt' tick={CustomXTick} />
        <Tooltip content={CustomTooltip} />
        <Line type='monotone' dataKey='sentimentScore' stroke='#8884d8' />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
