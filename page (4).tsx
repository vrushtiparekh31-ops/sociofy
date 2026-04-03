'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Sparkles, Search, RefreshCcw, ArrowRight, AlertCircle } from 'lucide-react';
import { analyzeContentAction } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function PredictionPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const platform = url.includes('instagram.com') ? 'Instagram' : 'YouTube';
      const res = await analyzeContentAction(url, platform);
      setResult(res);
    } catch (e: any) {
      setError(e.message || "Prediction analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-headline font-bold">Viral Content Prediction</h2>
        <p className="text-muted-foreground">AI-powered analysis of your content's potential for mass reach.</p>
      </header>

      <Card className="border-none shadow-soft rounded-2xl overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Paste content URL (YouTube/Instagram)..." 
                className="pl-10 h-12 rounded-xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-12 rounded-xl" onClick={handlePredict} disabled={loading || !url}>
              {loading ? <RefreshCcw className="animate-spin h-4 w-4 mr-2" /> : <Zap className="h-4 w-4 mr-2" />}
              Predict Virality
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="rounded-xl">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {result && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-soft rounded-2xl p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Virality Score
                </h3>
                <span className="text-3xl font-bold text-primary">{result.aiAnalysis.viralScore}%</span>
              </div>
              <Progress value={result.aiAnalysis.viralScore} className="h-3 rounded-full" />
              <p className="text-sm text-muted-foreground italic">
                "This content has {result.aiAnalysis.viralScore > 75 ? 'exceptionally high' : 'moderate'} potential to trend within its niche."
              </p>
              
              <div className="space-y-4 pt-4 border-t">
                <h4 className="text-sm font-bold uppercase text-primary">Virality Factors</h4>
                <div className="space-y-2">
                  <FactorBar label="Hook Strength" value={85} />
                  <FactorBar label="Shareability" value={result.engagementRate * 10} />
                  <FactorBar label="Topic Relevance" value={92} />
                  <FactorBar label="Retention Potential" value={78} />
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-soft rounded-2xl p-6 bg-accent/30">
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Improvement Suggestions
              </h3>
              <div className="space-y-4">
                {result.aiAnalysis.contentImprovementTips.map((tip: string, idx: number) => (
                  <div key={idx} className="flex gap-3 items-start bg-white p-4 rounded-xl shadow-sm">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function FactorBar({ label, value }: { label: string, value: number }) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
        <span>{label}</span>
        <span>{clampedValue.toFixed(0)}%</span>
      </div>
      <Progress value={clampedValue} className="h-1" />
    </div>
  );
}
