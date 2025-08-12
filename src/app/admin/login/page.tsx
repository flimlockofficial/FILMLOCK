
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = "@PRASHANT";

export default function AdminLoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setError("");
            // In a real app, you'd use a more secure session management system.
            // For this prototype, sessionStorage is sufficient.
            sessionStorage.setItem("isAdminAuthenticated", "true");
            router.push("/admin");
            toast({
                title: "Login Successful",
                description: "Welcome to the Admin Dashboard.",
            });
        } else {
            setError("Incorrect password. Please try again.");
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: "The password you entered is incorrect.",
            });
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>Admin Access</CardTitle>
                    <CardDescription>Enter the password to access the admin dashboard.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input 
                                id="password" 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••" 
                                required 
                            />
                             {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                        </div>
                        <Button type="submit" className="w-full">
                            Unlock
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
