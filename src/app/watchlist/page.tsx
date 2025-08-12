"use client";

import { Lock } from "lucide-react";

export default function WatchlistPage() {
  return (
    <div className="container mx-auto min-h-[calc(100vh-14rem)] max-w-screen-2xl py-16">
      <h1 className="mb-8 font-headline text-5xl font-bold">Your Watchlist</h1>
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-20 text-center">
        <Lock className="mb-4 h-16 w-16 text-muted-foreground" />
        <h2 className="font-headline text-2xl font-semibold">
          Your Watchlist is Empty
        </h2>
        <p className="mt-2 text-muted-foreground">
          The ability to add movies to your watchlist is coming soon!
        </p>
      </div>
    </div>
  );
}
