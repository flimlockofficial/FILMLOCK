
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useMovies } from "@/providers/movie-provider";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Movie } from "@/types";

export function ManageMoviesTable() {
  const { getAllMovies, toggleTrending, deleteMovie } = useMovies();
  const movies = getAllMovies();

  const handleDelete = (id: number, title: string) => {
    deleteMovie(id);
    toast.success(`"${title}" has been deleted.`);
  };

  if (movies.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No movies have been added yet.</p>
        <p>Add a movie using the form to see it here.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Poster</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Trending</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie: Movie) => (
          <TableRow key={movie.id}>
            <TableCell>
                <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={50}
                    height={75}
                    className="rounded-md object-cover"
                    unoptimized
                />
            </TableCell>
            <TableCell>{movie.title}</TableCell>
            <TableCell className="capitalize">{movie.category}</TableCell>
            <TableCell>
              <Switch
                checked={movie.isTrending}
                onCheckedChange={() => toggleTrending(movie.id)}
              />
            </TableCell>
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the movie
                      "{movie.title}".
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(movie.id, movie.title)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
