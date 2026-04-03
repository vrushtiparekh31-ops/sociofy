'use client';

import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full font-body relative">
        <AppSidebar />
        <SidebarInset className="bg-transparent">
          <header className="flex h-20 shrink-0 items-center gap-4 glass sticky top-2 z-40 px-6 lg:px-10 mx-4 rounded-3xl">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-6" />
            
            <div className="flex-1 hidden md:block">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  placeholder="Quick search trends..." 
                  className="bg-white/40 border-none rounded-xl pl-10 h-10 focus-visible:ring-primary/20 backdrop-blur-sm"
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="flex items-center gap-5">
              <button 
                className="h-10 w-10 rounded-xl bg-white/40 backdrop-blur-sm flex items-center justify-center text-slate-600 hover:bg-white/60 transition-colors relative"
                suppressHydrationWarning
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border-2 border-white animate-pulse"></span>
              </button>
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 leading-none">Creator Studio</p>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Creator Pro</p>
                </div>
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[2px] shadow-lg shadow-primary/20">
                  <div className="h-full w-full rounded-[14px] bg-white flex items-center justify-center overflow-hidden">
                    <img src="https://picsum.photos/seed/creator/100/100" alt="Avatar" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <div className="flex flex-1 flex-col gap-8 p-6 md:p-12 lg:p-16 max-w-[1600px] mx-auto w-full relative z-10">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}