"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (email === "admin@example.com" && password === "admin123") {
            localStorage.setItem("role", "Admin");
            console.log(localStorage.getItem("role"));
            router.push("/admin");
        } else if (email === "reader@example.com" && password === "reader123") {
            localStorage.setItem("role", "Reader");
            router.push("/admin");
        } else {
            setError("Email ou mot de passe incorrect.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100" suppressHydrationWarning>
            <Card className="mx-auto max-w-md w-full bg-white shadow-lg p-6 rounded-xl border border-gray-300">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold text-blue-600">Connexion</CardTitle>
                    <CardDescription className="text-gray-600">Entrez votre email et mot de passe</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Se connecter</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
