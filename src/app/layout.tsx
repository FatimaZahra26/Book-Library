import './globals.css';
import { ReactNode } from "react";
import {AuthProvider} from "@/context/AuthContext";

export const metadata = {
    title: "Bibliothèque de Livres",
    description: "Une librairie de présentation de livres avec Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (

        <html lang="fr">
        <body className="bg-gray-100 p-4">

        <AuthProvider>
            <html lang="fr">
            <body suppressHydrationWarning>{children}</body>
            </html>
        </AuthProvider>
        </body>
        </html>
    );
}
