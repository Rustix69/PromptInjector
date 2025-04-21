
import React from 'react';
import { cn } from '@/lib/utils';

type RiskLevel = 'low' | 'medium' | 'high';

interface RiskBadgeProps {
  level: RiskLevel;
  className?: string;
}

const RiskBadge = ({ level, className }: RiskBadgeProps) => {
  const baseClasses = 'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const levelClasses = {
    low: 'bg-sentinel-alert-blue/20 text-sentinel-alert-blue',
    medium: 'bg-sentinel-alert-yellow/20 text-sentinel-alert-yellow',
    high: 'bg-red-500/20 text-red-500',
  };
  
  return (
    <span className={cn(baseClasses, levelClasses[level], className)}>
      {level}
    </span>
  );
};

export default RiskBadge;
