"use client";
import RoleGuard from "../components/RoleGuard";
import BookList from "../components/BookList";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";

export default function AdminPage() {
    const { userRole } = useAuth();
    const [role, setRole] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        if (userRole) {
            setRole(userRole);
        }
    }, [userRole]);

    const handleLogout = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <RoleGuard allowedRoles={["admin", "reader"]}>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500" suppressHydrationWarning>
                <div className="p-8 bg-white dark:bg-gray-900 shadow-xl rounded-lg w-full max-w-5xl min-h-[80vh] transform transition hover:shadow-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-gray-900 dark:text-white animate-fade-in">
                        📚 Welcome to <span className="text-blue-600 dark:text-blue-400">Book-Library</span>
                    </h1>
                    <p className="text-center text-gray-500 dark:text-gray-400 md:text-lg mt-2 animate-fade-in">
                        A Home For Your Books.
                    </p>
                    <p className="text-center mt-4 text-lg text-gray-700 dark:text-gray-300">
                        Bienvenue, <span className="font-semibold text-blue-600 dark:text-blue-400">{role === "admin" ? "Admin" : "Lecteur"}</span> !
                        Vous pouvez gérer les livres ici.
                    </p>
                    <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-2 bg-red-500 px-4 py-2 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-300 shadow-md"
                    >
                        <LogOutIcon className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                    <div className="mt-8">
                        <BookList />
                    </div>
                </div>
            </div>
        </RoleGuard>
    );
}
