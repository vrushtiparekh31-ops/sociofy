'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  RefreshCcw, 
  Eye, 
  Share2,
  Activity
} from 'lucide-react';
import { analyzeContentAction } from '@/lib/actions';
import { 
  Bar, 
  BarChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  value: {
    label: "Metric Value",
  },
  views: {
    label: "Views",
    color: "hsl(var(--primary))",
  },
  likes: {
    label: "Likes",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function InsightsPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await analyzeContentAction(url, 'YouTube');
      setData(res);
    } catch (e) {
      console.error("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const chartData = data ? [
    { name: 'Views', value: data.stats.views, color: 'hsl(var(--primary))' },
    { name: 'Likes', value: data.stats.likes, color: 'hsl(var(--chart-2))' },
    { name: 'Comments', value: data.stats.comments, color: 'hsl(var(--chart-3))' },
  ] : [];

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-headline font-bold">Algorithm-Aware Insights</h2>
        <p className="text-muted-foreground">Deep analysis of engagement, watch time, and shareability metrics.</p>
      </header>

      <Card className="border-none shadow-soft rounded-2xl overflow-hidden p-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Paste content URL for deep analytics..." 
              className="pl-10 h-12 rounded-xl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <Button size="lg" className="h-12 rounded-xl" onClick={handleAnalyze} disabled={loading}>
            {loading ? <RefreshCcw className="animate-spin h-4 w-4 mr-2" /> : <BarChart3 className="h-4 w-4 mr-2" />}
            Fetch Data
          </Button>
        </div>
      </Card>

      {data && (
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Card className="border-none shadow-soft rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Performance Overview
              </h3>
              <div className="h-[300px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={chartData}>
                    <XAxis 
                      dataKey="name" 
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <StatDetail label="Engagement Rate" value={`${data.engagementRate}%`} icon={<TrendingUp className="text-green-500" />} />
            <StatDetail label="Total Reach" value={data.stats.views.toLocaleString()} icon={<Eye className="text-blue-500" />} />
            <StatDetail label="Interaction Vol." value={(data.stats.likes + data.stats.comments).toLocaleString()} icon={<Share2 className="text-purple-500" />} />
            
            <Card className="border-none shadow-soft rounded-2xl p-6 bg-primary text-primary-foreground">
              <h4 className="font-bold text-sm uppercase mb-2">Algo-Adaptation</h4>
              <p className="text-xs text-primary-foreground/70 leading-relaxed">
                Platform behavior suggests this content should be prioritized for "Up Next" queues based on its current comment-to-view ratio.
              </p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function StatDetail({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <Card className="border-none shadow-soft rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
        <div className="p-2 bg-muted rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}