
'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = "@PRASHANT";

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setError("");
            if (isClient) {
                sessionStorage.setItem("isAdminAuthenticated", "true");
                router.push("/admin");
                toast.success("Login Successful", {
                    description: "Welcome to the Admin Dashboard.",
                });
            }
        } else {
            setError("Incorrect password. Please try again.");
            toast.error("Login Failed", {
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
