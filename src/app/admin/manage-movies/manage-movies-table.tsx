
"use client";

import React from "react";
import { useMovies } from "@/providers/movie-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Trash2 } from "lucide-react";
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

export function ManageMoviesTable() {
  const { getAllMovies, toggleTrendingStatus, isTrending, deleteMovie } = useMovies();
  const allMovies = getAllMovies();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Movies</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allMovies.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell className="font-medium">{movie.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">{movie.category || 'N/A'}</Badge>
                </TableCell>
                <TableCell>
                  {isTrending(movie.id) ? (
                    <Badge variant="default" className="bg-primary/80">
                      <Star className="mr-2 h-4 w-4" />
                      Trending
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Standard</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTrendingStatus(movie.id)}
                  >
                    {isTrending(movie.id) ? "Untrend" : "Trend"}
                  </Button>
                   <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the movie
                          "{movie.title}" from your website.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMovie(movie.id)}>
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
         {allMovies.length === 0 && (
            <div className="text-center p-8 text-muted-foreground">
                No movies have been added yet.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
