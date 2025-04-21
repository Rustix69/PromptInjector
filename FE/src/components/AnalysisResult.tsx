import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import ScoreCard from './ScoreCard';
import RiskBadge from './RiskBadge';
import { Check, Flag, Send, Pencil, X } from 'lucide-react';

interface AnalysisResultProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prompt: string;
  analysisData?: {
    rules_score: number;
    llm_score: number;
    final_score: number;
    reason: string;
    action: string;
  } | null;
}

interface DetectionItem {
  title: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
}

const AnalysisResult = ({ open, onOpenChange, prompt, analysisData }: AnalysisResultProps) => {
  // Use real data if available, otherwise use mock data
  const scores = analysisData ? {
    // Ensure we are correctly converting from decimal (0.0-1.0) to percentage (0-100)
    ruleBased: Math.max(0, Math.min(100, Math.round(analysisData.rules_score * 100))),
    llmBased: Math.max(0, Math.min(100, Math.round(analysisData.llm_score * 100))),
    overall: Math.max(0, Math.min(100, Math.round(analysisData.final_score * 100)))
  } : {
    ruleBased: 20,
    llmBased: 27,
    overall: 20
  };

  // Log the analysis data and scores for debugging
  console.log('Analysis Data:', analysisData);
  console.log('Calculated Scores:', scores);

  // Use real analysis text if available
  const analysisText = analysisData?.reason || "The prompt contains patterns that could be attempting to override system instructions or extract sensitive information.";

  // Determine the banner color based on the action from API or overall score
  const isPass = analysisData ? analysisData.action === "safe" : scores.overall >= 25;
  const bannerClass = isPass ? "bg-gradient-to-r from-green-800 to-green-900" : "bg-gradient-to-r from-red-600 to-red-800";
  const bannerText = isPass ? "Recommended Action: Pass" : "Recommended Action: Fail";
  const bannerIcon = isPass ? <Check className="mt-0.5" size={18} /> : <X className="mt-0.5" size={18} />;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-r from-gray-800 to-black text-white max-w-xl mx-auto p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Prompt Analysis Results</DialogTitle>
        </DialogHeader>
        
        {/* Recommendation Banner */}
        <div className={`${bannerClass} text-white rounded-lg p-4 flex items-start gap-2`}>
          {bannerIcon}
          <div>
            <p className="font-medium">{bannerText}</p>
            <p className="text-sm opacity-80">{isPass ? "This prompt appears safe to send." : "This prompt may contain issues."}</p>
          </div>
        </div>
        
        {/* Score Cards */}
        <div className="grid grid-cols-3 gap-3">
          <ScoreCard 
            title="Rule-Based Score" 
            score={scores.ruleBased} 
            color="green"
          />
          <ScoreCard 
            title="LLM-Based Score" 
            score={scores.llmBased} 
            color="blue"
          />
          <ScoreCard 
            title="Overall Score" 
            score={scores.overall} 
            color="green"
          />
        </div>
        
        {/* Analyzed Prompt */}
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-1">Analyzed Prompt</h3>
          <div className="bg-black/50 rounded-lg p-3 text-white/80 border border-white/5">
            {prompt || "No prompt provided"}
          </div>
        </div>
        
        {/* LLM Analysis */}
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-1">LLM Analysis</h3>
          <div className="bg-black/50 rounded-lg p-3 text-white/80 border border-white/5">
            {analysisText}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisResult;
