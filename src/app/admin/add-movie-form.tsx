
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMovies } from "@/providers/movie-provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { MovieCategory } from "@/types";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.enum(["hollywood", "bollywood", "anime"], {
    required_error: "Category is required",
  }),
  poster: z.any().refine(files => files?.length === 1, "Poster is required."),
  movieFile: z.any().refine(files => files?.length === 1, "Movie file is required."),
});

type FormData = z.infer<typeof formSchema>;

export function AddMovieForm() {
  const { addMovie } = useMovies();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const category = watch("category");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    
    // Simulate file upload and get a URL
    const posterUrl = URL.createObjectURL(data.poster[0]);
    const movieUrl = URL.createObjectURL(data.movieFile[0]);

    try {
      // Simulate a network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addMovie({
        id: Date.now(),
        title: data.title,
        category: data.category as MovieCategory,
        posterUrl,
        trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
        movieUrl,
      });
      
      toast.success("Movie added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add movie.", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Movie Title</Label>
        <Input 
          id="title" 
          {...register("title")}
          placeholder="e.g., The Grand Adventure" 
        />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
         <Select onValueChange={(value) => setValue('category', value as MovieCategory)} value={category}>
            <SelectTrigger>
                <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="hollywood">Hollywood</SelectItem>
                <SelectItem value="bollywood">Bollywood</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
            </SelectContent>
        </Select>
        {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="poster">Poster Image</Label>
        <Input id="poster" type="file" {...register("poster")} accept="image/*" />
        {errors.poster && <p className="text-sm text-destructive">{errors.poster.message as string}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="movieFile">Movie File</Label>
        <Input id="movieFile" type="file" {...register("movieFile")} accept="video/*" />
        {errors.movieFile && <p className="text-sm text-destructive">{errors.movieFile.message as string}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? "Adding Movie..." : "Add Movie"}
      </Button>
    </form>
  );
}
