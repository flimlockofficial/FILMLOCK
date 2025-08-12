
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Upload, Film } from "lucide-react";
import { useMovies } from "@/providers/movie-provider";
import type { MovieCategory } from "@/types";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  poster: z.any().refine((files) => files?.length === 1, "Poster image is required."),
  movieFile: z.any().refine((files) => files?.length === 1, "Movie file is required."),
  category: z.enum(["bollywood", "hollywood", "anime"]),
  releaseDate: z.string().optional(),
  trailerUrl: z.string().url("Please enter a valid URL.").optional(),
});

export function AddMovieForm() {
  const { toast } = useToast();
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [movieFileName, setMovieFileName] = useState<string | null>(null);
  const { addMovie } = useMovies();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      releaseDate: "",
      trailerUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you'd upload the files to a storage service and get back URLs.
    // For this prototype, we'll continue using the poster preview and simulate the movie upload.
    if (posterPreview && values.movieFile) {
       addMovie({
        id: Date.now(), // Use timestamp for a more unique ID
        title: values.title,
        posterUrl: posterPreview,
        category: values.category as MovieCategory,
        releaseDate: values.releaseDate,
        trailerUrl: values.trailerUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ",
        // movieUrl would be set here after upload
       });
       toast({
         title: "Movie Added!",
         description: `${values.title} has been successfully added.`,
       });
       form.reset();
       setPosterPreview(null);
       setMovieFileName(null);
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please upload both a poster image and a movie file.",
        })
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add a New Movie</CardTitle>
        <CardDescription>Upload a movie poster and the movie file to add a new movie to your site.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="poster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Poster</FormLabel>
                   <FormControl>
                    <div className="relative flex items-center justify-center w-full">
                       <label htmlFor="poster-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                          {posterPreview ? (
                            <Image src={posterPreview} alt="Poster preview" width={150} height={225} className="object-contain h-full" crossOrigin="anonymous" />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload poster</span></p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 800x1200px)</p>
                            </div>
                          )}
                       </label>
                       <Input 
                         id="poster-upload" 
                         type="file" 
                         className="hidden"
                         accept="image/png, image/jpeg, image/webp"
                         onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                field.onChange(e.target.files);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setPosterPreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                         }}
                       />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="movieFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie File</FormLabel>
                   <FormControl>
                    <div className="relative flex items-center justify-center w-full">
                       <label htmlFor="movie-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                          {movieFileName ? (
                             <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                              <Film className="w-8 h-8 mb-4 text-primary" />
                              <p className="mb-2 text-sm font-semibold">{movieFileName}</p>
                              <p className="text-xs text-muted-foreground">Click to choose a different file</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload movie file</span></p>
                              <p className="text-xs text-muted-foreground">MP4, MOV, or AVI</p>
                            </div>
                          )}
                       </label>
                       <Input 
                         id="movie-upload" 
                         type="file" 
                         className="hidden"
                         accept="video/mp4,video/x-m4v,video/*"
                         onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                field.onChange(e.target.files);
                                setMovieFileName(file.name);
                            }
                         }}
                       />
                    </div>
                  </FormControl>
                   <FormDescription>
                    Upload the actual movie file here.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter movie title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hollywood">Hollywood</SelectItem>
                      <SelectItem value="bollywood">Bollywood</SelectItem>
                      <SelectItem value="anime">Anime</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Release Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trailerUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trailer URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                   <FormDescription>
                    Provide a link to the movie's trailer on YouTube.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="w-full">
              Add Movie
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
