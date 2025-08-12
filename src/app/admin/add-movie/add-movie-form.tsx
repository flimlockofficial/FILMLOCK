"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Upload } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  poster: z.any().refine((files) => files?.length === 1, "Poster image is required."),
  releaseDate: z.string().optional(),
  trailerUrl: z.string().url("Please enter a valid URL.").optional(),
});

export function AddMovieForm() {
  const { toast } = useToast();
  const [posterPreview, setPosterPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: "Movie Added!",
      description: `${values.title} has been successfully added. (This is a demo, data is not saved)`,
    });
    form.reset();
    setPosterPreview(null);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add a New Movie</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="poster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie Poster</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center justify-center w-full">
                       <label htmlFor="poster-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                          {posterPreview ? (
                            <Image src={posterPreview} alt="Poster preview" width={150} height={225} className="object-contain h-full" />
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add Movie"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
