
"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "./login/actions";
import { PageTracker } from "./page-tracker";


export function AdminDashboardClient({ children }: { children: React.ReactNode }) {

  return (
    <div className="container mx-auto max-w-screen-2xl py-16">
        <PageTracker />
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-headline text-5xl font-bold">Admin Dashboard</h1>
           <form action={logout}>
            <Button type="submit" variant="destructive">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
            </Button>
          </form>
        </div>
        {children}
    </div>
  );
}
