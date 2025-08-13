
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HollywoodMovies } from "./hollywood-movies";
import { BollywoodMovies } from "./bollywood-movies";
import { AnimeMovies } from "./anime-movies";
import { SouthIndianMovies } from "./south-indian-movies";

export function AllMovies() {
  return (
    <Tabs defaultValue="hollywood" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
          <TabsTrigger value="hollywood">Hollywood</TabsTrigger>
          <TabsTrigger value="bollywood">Bollywood</TabsTrigger>
          <TabsTrigger value="anime">Anime</TabsTrigger>
          <TabsTrigger value="south-indian">South Indian</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="hollywood">
        <HollywoodMovies />
      </TabsContent>
      <TabsContent value="bollywood">
        <BollywoodMovies />
      </TabsContent>
      <TabsContent value="anime">
        <AnimeMovies />
      </TabsContent>
       <TabsContent value="south-indian">
        <SouthIndianMovies />
      </TabsContent>
    </Tabs>
  );
}
