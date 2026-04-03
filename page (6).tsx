'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Search, 
  RefreshCcw, 
  Music, 
  Video, 
  Hash, 
  ArrowRight, 
  Sparkles,
  Zap,
  Globe,
  Share2
} from 'lucide-react';
import { getTrendingTopicsAction, analyzeContentAction } from '@/lib/actions';
import { extractYouTubeId } from '@/lib/youtube';

export default function TrendAnalyzerPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!input) return;
    setLoading(true);
    try {
      let searchQuery = input;
      
      // If it looks like a YouTube URL, try to get some context first
      if (extractYouTubeId(input)) {
        try {
          const analysis = await analyzeContentAction(input, 'YouTube');
          searchQuery = analysis.stats.title;
        } catch (e) {
          console.warn("Could not fetch video data, using URL as query");
        }
      }

      const data = await getTrendingTopicsAction(searchQuery);
      setResults(data);
    } catch (e) {
      console.error("Trend analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="space-y-2">
        <h2 className="text-4xl font-headline font-bold text-primary flex items-center gap-3">
          <Globe className="h-10 w-10 text-secondary" />
          Trend Detection Engine
        </h2>
        <p className="text-muted-foreground text-lg">
          Identify viral topics, trending audio, and high-conversion formats from any URL or topic.
        </p>
      </header>

      <Card className="border-none shadow-soft rounded-3xl overflow-hidden p-8 bg-white">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Paste content URL or type a niche (e.g., 'AI in 2024')..." 
                className="pl-12 h-14 rounded-2xl border-muted-foreground/20 text-lg shadow-inner"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-lg shadow-lg group transition-all" onClick={handleAnalyze} disabled={loading || !input}>
              {loading ? <RefreshCcw className="animate-spin h-5 w-5 mr-2" /> : <Sparkles className="h-5 w-5 mr-2 group-hover:scale-125 transition-transform" />}
              Scan Ecosystem
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground px-2">
            <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-yellow-500" /> Real-time detection</span>
            <span className="flex items-center gap-1.5"><Share2 className="h-4 w-4 text-blue-500" /> Cross-platform sync</span>
          </div>
        </div>
      </Card>

      {results && (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-6">
            <h3 className="text-2xl font-bold px-2 flex items-center gap-2">
              <TrendingUp className="text-green-500" />
              High-Discovery Topics
            </h3>
            
            <div className="grid gap-6">
              {results.topics.map((item: any, idx: number) => (
                <Card key={idx} className="border-none shadow-soft rounded-3xl overflow-hidden hover:shadow-xl transition-all group border border-transparent hover:border-primary/10">
                  <CardContent className="p-0">
                    <div className="p-6 md:p-8 space-y-6">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2">
                          <h4 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">{item.topic}</h4>
                          <p className="text-muted-foreground leading-relaxed">{item.reason}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-full px-4 py-1 border-none shrink-0">
                          Trending
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-accent/40 p-4 rounded-2xl flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl shadow-sm text-primary">
                            <Music className="h-5 w-5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Suggested Audio</p>
                            <p className="text-sm font-semibold">{item.suggestedAudio}</p>
                          </div>
                        </div>
                        <div className="bg-accent/40 p-4 rounded-2xl flex items-center gap-3">
                          <div className="p-2 bg-white rounded-xl shadow-sm text-secondary">
                            <Video className="h-5 w-5" />
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[10px] font-bold uppercase text-muted-foreground">Best Format</p>
                            <p className="text-sm font-semibold">{item.recommendedFormat}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.hashtags.map((h: string, i: number) => (
                          <Badge key={i} variant="outline" className="rounded-xl border-primary/20 bg-primary/5 text-primary px-3 py-1 text-xs">
                            {h}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-soft rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-secondary" />
                Strategic Engine
              </h3>
              <p className="text-primary-foreground/80 leading-relaxed mb-8">
                {results.overallExplanation}
              </p>
              
              <div className="space-y-4 pt-6 border-t border-white/10">
                <h4 className="font-bold text-sm uppercase text-secondary">Pro Growth Tip</h4>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-sm">
                  Always use the 'Suggested Audio' style in the first 3 seconds of your content to trigger the platform's audio-based discovery algorithm.
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {!results && !loading && (
        <div className="py-20 text-center space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent text-muted-foreground mb-4">
            <Globe className="h-10 w-10 opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-muted-foreground">Enter a URL or Topic to begin detection</h3>
          <p className="text-muted-foreground max-w-xs mx-auto text-sm">Our AI will scan global platforms to find exactly what's working right now in your niche.</p>
        </div>
      )}
    </div>
  );
}
