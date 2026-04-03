'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, Wand2, Hash, FileText, Layout, RefreshCcw } from 'lucide-react';
import { aiContentMarketingAdvisor } from '@/ai/flows/ai-content-marketing-advisor-flow';

export default function OptimizerPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState<any>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      // Reusing the advisor flow for generation
      const res = await aiContentMarketingAdvisor({
        titleOrCaption: topic,
        platformType: 'YouTube',
        engagementRate: 0,
      });
      setGenerated(res);
    } catch (e) {
      console.error("Optimization failed");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-headline font-bold">Content Optimization Assistant</h2>
        <p className="text-muted-foreground">Generate viral-ready hooks, headlines, and captions with AI.</p>
      </header>

      <Card className="border-none shadow-soft rounded-2xl overflow-hidden p-6">
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Your Content Idea / Draft</label>
          <Textarea 
            placeholder="Describe your content or paste a draft here..." 
            className="min-h-[120px] rounded-2xl resize-none"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button size="lg" className="w-full h-12 rounded-xl" onClick={handleGenerate} disabled={loading || !topic}>
            {loading ? <RefreshCcw className="animate-spin h-4 w-4 mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
            Generate Optimization Package
          </Button>
        </div>
      </Card>

      {generated && (
        <Tabs defaultValue="titles" className="space-y-6">
          <TabsList className="bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="titles" className="rounded-lg px-6 py-2">Hooks & Headlines</TabsTrigger>
            <TabsTrigger value="captions" className="rounded-lg px-6 py-2">Captions</TabsTrigger>
            <TabsTrigger value="hashtags" className="rounded-lg px-6 py-2">SEO & Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="titles" className="grid gap-4">
            {generated.betterTitleSuggestions.map((t: string, idx: number) => (
              <ContentItem key={idx} text={t} type="Headline" onCopy={() => copyToClipboard(t)} />
            ))}
          </TabsContent>

          <TabsContent value="captions" className="grid gap-4">
            {generated.captions.map((c: string, idx: number) => (
              <ContentItem key={idx} text={c} type="Caption" onCopy={() => copyToClipboard(c)} />
            ))}
          </TabsContent>

          <TabsContent value="hashtags" className="space-y-6">
            <Card className="border-none shadow-soft rounded-2xl p-6">
              <h4 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Recommended Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {generated.hashtags.map((h: string, idx: number) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="px-4 py-2 rounded-xl bg-primary/5 text-primary border-primary/20 cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => copyToClipboard(h)}
                  >
                    {h}
                  </Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function ContentItem({ text, type, onCopy }: { text: string, type: string, onCopy: () => void }) {
  return (
    <Card className="border-none shadow-soft rounded-2xl group hover:shadow-md transition-all">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <div className="space-y-1 flex-1">
          <span className="text-[10px] font-bold uppercase text-muted-foreground">{type}</span>
          <p className="text-sm font-medium">{text}</p>
        </div>
        <Button variant="ghost" size="icon" className="shrink-0 rounded-xl" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
