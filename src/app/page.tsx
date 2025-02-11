'use client';
import RoleGuard from "./components/RoleGuard";
import BookList from "./components/BookList";
import {useEffect, useState} from "react";
import {redirect} from "next/navigation";

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);
    redirect("/login");

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    return (
        <RoleGuard allowedRoles={["Admin", "Reader"]}>
            <div className="space-y-6" suppressHydrationWarning>
                <h1 className="text-3xl font-bold">Bienvenue à la Bibliothèque</h1>
                <BookList />
            </div>
        </RoleGuard>
    );
}
