
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'green' | 'yellow' | 'blue';
  className?: string;
}

const ProgressBar = ({ value, max, color = 'green', className }: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorClasses = {
    green: 'bg-sentinel-safe-green',
    yellow: 'bg-sentinel-alert-yellow',
    blue: 'bg-sentinel-alert-blue',
  };

  return (
    <div className={cn('w-full h-1.5 bg-white/10 rounded-full overflow-hidden', className)}>
      <div 
        className={cn('h-full rounded-full', colorClasses[color])}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
