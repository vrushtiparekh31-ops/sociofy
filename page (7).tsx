'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, RefreshCcw, Hash, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getTrendingTopicsAction } from '@/lib/actions';

export default function TrendsPage() {
  const [trending, setTrending] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const data = await getTrendingTopicsAction();
      setTrending(data);
    } catch (e) {
      console.error("Failed to load trends");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold">Trend Detection Engine</h2>
          <p className="text-muted-foreground">Real-time topics, hashtags, and formats across social platforms.</p>
        </div>
        <Button variant="outline" size="sm" onClick={loadTrending} disabled={loading}>
          <RefreshCcw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Trends
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Card key={i} className="h-40 animate-pulse bg-muted rounded-2xl" />)}
            </div>
          ) : trending?.topics.map((topic: any, idx: number) => (
            <Card key={idx} className="border-none shadow-soft rounded-2xl overflow-hidden group hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-primary">{topic.topic}</h3>
                    <p className="text-sm text-muted-foreground">{topic.reason}</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-none">Trending Now</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {topic.hashtags.map((h: string, hIdx: number) => (
                    <Badge key={hIdx} variant="outline" className="rounded-lg border-primary/20 bg-primary/5 text-primary">
                      {h}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground border-t pt-4">
                  <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> Instagram, TikTok, YouTube</span>
                  <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> +145% Reach Potential</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-soft rounded-2xl bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Strategy Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                {trending?.overallExplanation || "Analyzing current digital landscape for strategic hooks..."}
              </p>
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-sm font-bold">Quick Tips:</div>
                <ul className="text-xs space-y-2 text-primary-foreground/70">
                  <li className="flex gap-2"><span>•</span> Leverage short-form video for these topics first.</li>
                  <li className="flex gap-2"><span>•</span> Use the first 3 hashtags in your bio or description.</li>
                  <li className="flex gap-2"><span>•</span> Combine these trends with a personal storytelling hook.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
