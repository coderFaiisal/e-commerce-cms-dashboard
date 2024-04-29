'use client';

import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import CustomTooltip from './customTooltip';
import React from 'react';

type OverviewProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
};

export const Overview: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={value => `$${value}`}
        />
        <Tooltip
          content={<CustomTooltip payload={data} />}
          isAnimationActive={false}
          cursor={<Rectangle fill="#D6FFF5" radius={[4, 4, 0, 0]} />}
        />
        <Bar dataKey="total" fill="#36d7b7" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
