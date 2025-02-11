"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const { logout, userRole } = useAuth();
    const router = useRouter();

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
            <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

            <ul className="space-y-4">
                <li>
                    <Link href="/" className="block p-2 hover:bg-gray-700 rounded">
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link href="/admin" className="block p-2 hover:bg-gray-700 rounded">
                        Gestion des Livres
                    </Link>
                </li>
                {userRole === "admin" && (
                    <li>
                        <Link href="/add-review" className="block p-2 hover:bg-gray-700 rounded">
                            Ajouter une Critique
                        </Link>
                    </li>
                )}
            </ul>

            <button
                onClick={() => {
                    logout();
                    router.push("/login");
                }}
                className="mt-6 w-full bg-red-500 p-2 rounded text-white hover:bg-red-700"
            >
                Déconnexion
            </button>
        </div>
    );

}
