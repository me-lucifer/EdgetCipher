'use client'

import React from 'react';

// This is a simplified custom Candlestick component for recharts.
// Recharts itself doesn't export a Candlestick series component directly.
export const CustomCandlestick = (props: any) => {
  const { data, dataKey, x, y, width, height } = props;
  
  // This component will be rendered by the chart, but we need to return the data points
  // that recharts will then use to render the items. We'll add the rendering logic
  // inside the `shape` prop of a custom Dot component.
  
  const Candle = (candleProps: any) => {
    const { cx, cy, payload } = candleProps;
    const { y: yAxis } = props.yAxis;

    if (!payload || !payload[dataKey]) return null;

    const [open, high, low, close] = payload[dataKey];

    const isBullish = close >= open;
    const fill = isBullish ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
    const stroke = isBullish ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';

    const yOpen = yAxis.scale(open);
    const yClose = yAxis.scale(close);
    
    const bodyHeight = Math.abs(yOpen - yClose);
    const bodyY = Math.min(yOpen, yClose);
    
    const highWickY = yAxis.scale(high);
    const lowWickY = yAxis.scale(low);

    return (
      <g stroke={stroke} fill={fill} strokeWidth="1">
        {/* Wick */}
        <line x1={cx} y1={highWickY} x2={cx} y2={lowWickY} />
        {/* Body */}
        <rect x={cx - 4} y={bodyY} width={8} height={bodyHeight} />
      </g>
    );
  };


  return (
    // We are adding a dummy Dot component whose `shape` is our custom Candle renderer.
    // This is a common pattern for creating custom series in recharts.
    // @ts-ignore
    <props.chart.props.children.type data={data} {...props} shape={<Candle />} />
  );
};
