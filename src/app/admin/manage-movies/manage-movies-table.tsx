
"use client";

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
import { Star } from "lucide-react";

export function ManageMoviesTable() {
  const { getAllMovies, toggleTrendingStatus, isTrending } = useMovies();
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
              <TableHead className="text-right">Action</TableHead>
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
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleTrendingStatus(movie.id)}
                  >
                    {isTrending(movie.id) ? "Remove from Trending" : "Add to Trending"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
