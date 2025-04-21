import React from 'react';
import { cn } from '@/lib/utils';
import ProgressBar from './ProgressBar';

interface ScoreCardProps {
  title: string;
  score: number;
  maxScore?: number;
  color?: 'green' | 'yellow' | 'blue';
  className?: string;
}

const ScoreCard = ({ 
  title, 
  score, 
  maxScore = 100, 
  color = 'green',
  className 
}: ScoreCardProps) => {
  // Ensure score is a valid number and displayed as an integer
  const displayScore = isNaN(score) ? 0 : Math.round(score);
  
  return (
    <div className={cn(
      'bg-sentinel-card-bg rounded-lg p-4 flex flex-col gap-2', 
      'border border-white/5',
      className
    )}>
      <h3 className="text-sm font-medium text-white/70">{title}</h3>
      <p className="text-4xl font-bold">{displayScore}</p>
      <ProgressBar value={displayScore} max={maxScore} color={color} />
    </div>
  );
};

export default ScoreCard;
