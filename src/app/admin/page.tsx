
import { AddMovieForm } from "./add-movie-form";
import { ManageMoviesTable } from "./manage-movies-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Movie</CardTitle>
          </CardHeader>
          <CardContent>
            <AddMovieForm />
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
         <Card>
            <CardHeader>
                <CardTitle>Manage Movies</CardTitle>
            </CardHeader>
            <CardContent>
                <ManageMoviesTable />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
