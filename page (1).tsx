'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, CheckCircle2, Star, Youtube, Instagram, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side: Visual & Marketing */}
      <div className="hidden lg:flex flex-col w-1/2 bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary blur-3xl opacity-50"></div>
        </div>
        
        <Link href="/" className="flex items-center gap-2 relative z-10 mb-20">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <span className="font-headline font-bold text-3xl tracking-tighter">SOCIOFY</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center space-y-8 relative z-10">
          <h1 className="text-5xl font-headline font-bold leading-tight">
            The platform built for <br />
            <span className="text-secondary">Viral Growth.</span>
          </h1>
          
          <div className="space-y-6">
            <FeatureItem 
              icon={<Youtube className="text-secondary" />} 
              title="YouTube SEO Engine" 
              desc="Deep-dive analytics to outrank your competitors." 
            />
            <FeatureItem 
              icon={<Instagram className="text-secondary" />} 
              title="Instagram Engagement AI" 
              desc="Know exactly when and what to post for maximum reach." 
            />
            <FeatureItem 
              icon={<Sparkles className="text-secondary" />} 
              title="Predictive Virality" 
              desc="Our ML models predict your content success before you post." 
            />
          </div>

          <div className="pt-10 border-t border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-muted overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/100/100`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center text-secondary">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-current" />)}
                </div>
                <p className="text-xs text-primary-foreground/70 font-medium">Joined by 12,000+ top creators</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground">Get started for free. No credit card required.</p>
          </div>

          <Card className="border-none shadow-soft rounded-3xl p-2">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">First Name</label>
                  <Input placeholder="John" className="h-12 rounded-2xl bg-muted/30 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Last Name</label>
                  <Input placeholder="Doe" className="h-12 rounded-2xl bg-muted/30 border-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="h-12 rounded-2xl bg-muted/30 border-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Password</label>
                <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl bg-muted/30 border-none" />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <div className="mt-1">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">
                  I agree to Sociofy's <Link href="#" className="text-primary hover:underline">Terms of Service</Link> and <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              <Link href="/dashboard" className="block w-full pt-4">
                <Button className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] active:scale-[0.98]">
                  Join the Community
                </Button>
              </Link>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  <span className="bg-white px-4">Already a member?</span>
                </div>
              </div>

              <Link href="/auth/login" className="block w-full">
                <Button variant="outline" className="w-full h-12 rounded-2xl font-bold border-muted-foreground/20 hover:bg-muted/30">
                  Log In to Sociofy
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 shadow-inner">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="font-bold text-lg leading-none">{title}</h4>
        <p className="text-primary-foreground/60 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
