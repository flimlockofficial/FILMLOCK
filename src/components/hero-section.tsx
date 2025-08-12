import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[450px] w-full">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{backgroundImage: 'url(https://placehold.co/1920x1080)'}}
        data-ai-hint="dark cinematic background"
      />
       <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="font-body text-5xl font-bold md:text-7xl">
          Your Next Favorite Film
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover, track, and lock in the movies you love. Your ultimate cinematic journey starts here.
        </p>
        <form className="mt-8 flex w-full max-w-2xl items-center gap-2">
          <Input
            type="search"
            placeholder="Search for a movie..."
            className="h-14 flex-1 border-2 border-border bg-background/80 text-lg text-foreground placeholder:text-muted-foreground focus:bg-background focus:ring-primary"
            aria-label="Search for a movie"
          />
          <Button type="submit" size="lg" className="h-14 bg-primary px-8 text-primary-foreground hover:bg-primary/90">
            <Search className="mr-2 h-6 w-6" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
