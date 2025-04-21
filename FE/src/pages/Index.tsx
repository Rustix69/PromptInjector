import React, { useState } from 'react';
import { Send, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnalysisResult from '@/components/AnalysisResult';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const handleAnalyzePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const response = await fetch('http://localhost:8080/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setAnalysisData(data);
      setIsAnalyzing(false);
      setShowResults(true);
    } catch (error) {
      console.error('Error analyzing prompt:', error);
      setIsAnalyzing(false);
      // Handle error state if needed
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7)',
        }}
      />
      
      {/* Social Media Icons */}
      <div className="absolute top-6 right-6 flex space-x-4 z-20">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
          <img src="/logo/twitter.png" alt="Twitter" className="w-6 h-6 transform transition-transform hover:scale-110 shadow-md" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
          <img src="/logo/github.png" alt="GitHub" className="w-6 h-6 transform transition-transform hover:scale-110 shadow-md" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
          <img src="/logo/linkedin.png" alt="LinkedIn" className="w-6 h-6 transform transition-transform hover:scale-110 shadow-md" />
        </a>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-500 via-gray-300 to-white bg-clip-text text-transparent">
          Prompt Injection<br />Detection
        </h1>
        
        <p className="text-lg text-white/70 mb-12 max-w-md mx-auto backdrop-blur-sm">
          Analyze prompts for potential security threats before sending them to your AI system
        </p>
        
        <form onSubmit={handleAnalyzePrompt} className="w-full">
          <div className="flex items-center shadow-2xl rounded-full overflow-hidden bg-black/20 backdrop-blur-md border border-white/10">
            <Input
              className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/40"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button 
              type="submit"
              variant="gradient"
              disabled={isAnalyzing || !prompt.trim()}
              className="rounded-full mr-1 py-5 px-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-white/10"
            >
              {isAnalyzing ? (
                <div className="h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <>
                  <span className="mr-1">Send</span>
                  <Send size={16} />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      <AnalysisResult
        open={showResults}
        onOpenChange={setShowResults}
        prompt={prompt}
        analysisData={analysisData}
      />
    </div>
  );
};

export default Index;
