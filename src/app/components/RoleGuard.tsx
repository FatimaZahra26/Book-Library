"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RoleGuard = ({ allowedRoles, children }: { allowedRoles: string[]; children: React.ReactNode }) => {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedRole = localStorage.getItem("role");
        if (storedRole) {
            const normalizedRole = storedRole.toLowerCase();
            setRole(normalizedRole);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!role || !allowedRoles.includes(role)) {
        router.replace("/unauthorized");
        return null;
    }

    return <>{children}</>;
};

export default RoleGuard;
