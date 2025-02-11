export default function UnauthorizedPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-3xl font-bold text-red-500 mb-4">Accès Refusé</h1>
                <p>Vous n&apos;avez pas les permissions nécessaires pour accéder à cette page.</p>
            </div>
        </div>
    );
}
