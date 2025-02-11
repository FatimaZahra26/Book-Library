"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function BookDetailsModal({ book }: { book: any }) {
    return (
        <Dialog>
            <DialogTrigger className="text-blue-500 underline">Voir les détails</DialogTrigger>
            <DialogContent>
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-gray-500">par {book.author}</p>
                <p>{book.description}</p>
            </DialogContent>
        </Dialog>
    );
}
