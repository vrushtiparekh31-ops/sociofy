'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Clock, Globe, Repeat, Share2, Zap, ArrowRight, Sparkles } from 'lucide-react';

export default function StrategyPage() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-headline font-bold">Viral Strategy Generator</h2>
        <p className="text-muted-foreground">Personalized posting times and cross-platform distribution strategies.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-soft rounded-2xl p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Clock className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-none">Next Optimal Window</Badge>
                <h3 className="text-4xl font-bold">Tuesday at 2:00 PM PST</h3>
                <p className="text-primary-foreground/70 max-w-md">
                  Our algorithm has detected a surge in activity within your niche during this window. Posting now yields +34% engagement.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="bg-white/10 p-4 rounded-2xl flex-1 border border-white/10">
                  <p className="text-xs font-bold uppercase opacity-60">Success Rate</p>
                  <p className="text-2xl font-bold">88%</p>
                </div>
                <div className="bg-white/10 p-4 rounded-2xl flex-1 border border-white/10">
                  <p className="text-xs font-bold uppercase opacity-60">Reach Potential</p>
                  <p className="text-2xl font-bold">45.2k</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-soft rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Cross-Platform Distribution
            </h3>
            <div className="space-y-4">
              <DistributionPlan 
                platform="YouTube" 
                action="Full Length Video" 
                tip="Include 3 chapters for SEO benefit."
                delay="T+0h"
              />
              <DistributionPlan 
                platform="Instagram" 
                action="Reel Snippet" 
                tip="Use the 'Trending Audio' detected in Trends."
                delay="T+2h"
              />
              <DistributionPlan 
                platform="Twitter/X" 
                action="Thread Hook" 
                tip="Ask a controversial question related to the topic."
                delay="T+4h"
              />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-soft rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Repeat className="h-5 w-5 text-primary" />
              Repurposing Strategy
            </h3>
            <div className="space-y-3">
              <RepurposeItem icon={<Zap className="h-4 w-4 text-yellow-500" />} text="Turn video hook into an IG Story Poll" />
              <RepurposeItem icon={<Share2 className="h-4 w-4 text-blue-500" />} text="Convert description into a LinkedIn post" />
              <RepurposeItem icon={<Sparkles className="h-4 w-4 text-purple-500" />} text="Extract key quotes for Pinterest Pins" />
            </div>
          </Card>

          <Card className="border-none shadow-soft rounded-2xl p-6 bg-accent/50 border border-accent">
            <h4 className="font-bold text-sm mb-2">Creator Goal</h4>
            <p className="text-xs text-muted-foreground mb-4">You are currently targeting 'Audience Growth'. Strategy adapted for discovery vs loyalty.</p>
            <Button className="w-full rounded-xl" variant="outline">Adjust Goals</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function DistributionPlan({ platform, action, tip, delay }: { platform: string, action: string, tip: string, delay: string }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl border border-muted group hover:bg-white hover:shadow-md transition-all">
      <div className="h-10 w-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-xs shrink-0">
        {delay}
      </div>
      <div className="flex-1 space-y-0.5">
        <p className="text-sm font-bold">{platform}: {action}</p>
        <p className="text-xs text-muted-foreground">{tip}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
    </div>
  );
}

function RepurposeItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 text-sm font-medium">
      {icon}
      {text}
    </div>
  );
}
