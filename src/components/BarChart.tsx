import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

// The formatters can be defined outside of the component because they do not rely on props or state.
const formatNumber = (value: number): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(value);

const formatCurrency = (value: number): string => `$${formatNumber(value)}`;
const formatPercent = (value: number): string => `${value.toFixed(2)}%`;

type BarData = {
  label: string;
  value: number;
  formatter?: (value: number) => string; // This allows for an optional formatter to be provided
};

type BarChartProps = {
  data: BarData[];
  color: string;
};

const BarChart: React.FC<BarChartProps> = ({ data, color }) => {
  const barsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    data.forEach((item, index) => {
      const bar = barsRefs.current[index];
      if (bar) {
        // Use the value directly if a formatter is not provided.
        const valueToAnimate = item.formatter
          ? parseFloat(item.formatter(item.value).replace(/[^\d.-]/g, ''))
          : item.value;
        gsap.fromTo(
          bar,
          { width: 0 },
          {
            width: `${valueToAnimate}%`, // You need to adjust this logic based on how you want to scale the widths.
            duration: 1.5,
            ease: 'power3.out',
          }
        );
      }
    });
  }, [data]);

  return (
    <div>
      {data.map((item, index) => (
        <div key={item.label} className="bar-container">
          <div className="bar-label">{item.label}</div>
          <div
            className="bar"
            ref={(el) => (barsRefs.current[index] = el!)}
            style={{
              background: color,
              height: '20px',
              maxWidth: '100%',
              width: '0%', // Start with 0% width; GSAP will animate this
              margin: '5px 0',
            }}
          >
            {/* Optionally use the provided formatter for the value label */}
            <span className="bar-value">
              {item.formatter ? item.formatter(item.value) : formatNumber(item.value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
