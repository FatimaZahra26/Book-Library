import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

interface Book {
    title: string;
    author: string;
    description: string;
}

const initialBooks: Book[] = [
    { title: "1984", author: "George Orwell", description: "Dystopian novel about a totalitarian regime." },
    { title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", description: "Un conte philosophique et poétique." },
];

export default function BookList() {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newBook, setNewBook] = useState<Book>({ title: "", author: "", description: "" });
    const [isClient, setIsClient] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [role, setRole] = useState<string>("");
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedBookForReview, setSelectedBookForReview] = useState<Book | null>(null);

    useEffect(() => {
        setIsClient(true);
        setRole(localStorage.getItem("role") || "reader");
    }, []);

    if (!isClient) {
        return null;
    }

    const handleDelete = (index: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedBooks = books.filter((_, i) => i !== index);
                setBooks(updatedBooks);
                Swal.fire("Deleted!", "Your book has been deleted.", "success");
            }
        });
    };

    const handleEdit = (book: Book) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to edit this book?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, edit it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsEditing(true);
                setNewBook(book);
                setShowForm(true);
            }
        });
    };

    const handleSave = () => {
        if (isEditing) {
            setBooks(books.map(b => (b.title === newBook.title ? newBook : b)));
        } else {
            setBooks([...books, newBook]);
        }
        setNewBook({ title: "", author: "", description: "" });
        setIsEditing(false);
        setShowForm(false);
    };

    const handleReviewClick = (book: Book) => {
        Swal.fire({
            title: `Review for ${book.title}`,
            html: `
                <textarea id="reviewText" class="swal2-textarea" placeholder="Your review..." rows="4"></textarea>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Submit Review",
            cancelButtonText: "Cancel",
            preConfirm: () => {
                const reviewText = (document.getElementById("reviewText") as HTMLTextAreaElement).value;
                if (reviewText) {

                    Swal.fire("Review Submitted", `Review for ${book.title}: ${reviewText}`, "success");
                } else {
                    Swal.fire("Error", "Please enter a review.", "error");
                }
            },
        });
    };

    const ReviewForm = ({ book }: { book: Book }) => {
        const [review, setReview] = useState("");

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            alert(`Review for ${book.title}: ${review}`);
            setReview("");
            setShowReviewForm(false);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Review for {book.title}</h3>
                <textarea
                    className="w-full border p-2 rounded"
                    placeholder="Your review..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <Button type="submit">Submit Review</Button>
                <Button onClick={() => setShowReviewForm(false)} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
            </form>
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center" suppressHydrationWarning>
            {role === "Admin" && (
                <Button onClick={() => { setShowForm(true); setIsEditing(false); }} className="mb-4 bg-blue-950 hover:bg-blue-700 text-white transition duration-300">
                    + Add New Book
                </Button>
            )}

            <table className="w-full max-w-4xl bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
                <thead className="bg-blue-400 text-white">
                <tr>
                    <th className="px-6 py-3">Titre</th>
                    <th className="px-6 py-3">Auteur</th>
                    <th className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book, index) => (
                    <tr key={index} className="text-center hover:bg-gray-100 transition duration-200">
                        <td className="px-6 py-3">{book.title}</td>
                        <td className="px-6 py-3">{book.author}</td>
                        <td className="px-6 py-3 space-x-2">
                            <Button onClick={() => setSelectedBook(book)} className="bg-green-500 hover:bg-green-600 transition duration-300">View</Button>
                            {role === "Admin" && (
                                <>
                                    <Button onClick={() => handleEdit(book)} className="bg-yellow-500 hover:bg-yellow-600 transition duration-300">Edit</Button>
                                    <Button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 transition duration-300">Delete</Button>
                                </>
                            )}
                            <Button onClick={() => handleReviewClick(book)} className="bg-purple-500 hover:bg-purple-600 transition duration-300">Review</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fade-in">
                        <h2 className="text-xl font-bold mb-2">{selectedBook.title}</h2>
                        <p className="mb-2"><strong>Auteur:</strong> {selectedBook.author}</p>
                        <p className="mb-4"><strong>Description:</strong> {selectedBook.description}</p>
                        <Button onClick={() => setSelectedBook(null)} className="bg-gray-500 hover:bg-gray-600 transition duration-300">Close</Button>
                    </div>
                </div>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative animate-fade-in">
                        <h2 className="text-xl font-bold mb-2">{isEditing ? "Edit Book" : "Add New Book"}</h2>
                        <input
                            type="text"
                            placeholder="Titre"
                            value={newBook.title}
                            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                            className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <input
                            type="text"
                            placeholder="Auteur"
                            value={newBook.author}
                            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                            className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-400 transition"
                        />
                        <textarea
                            placeholder="Description"
                            value={newBook.description}
                            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            className="w-full p-2 border rounded mb-4 focus:ring-2 focus:ring-blue-400 transition"
                        ></textarea>
                        <div className="flex justify-between">
                            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 transition duration-300">
                                {isEditing ? "Save Changes" : "Add Book"}
                            </Button>
                            <Button onClick={() => setShowForm(false)} className="bg-red-500 hover:bg-red-600 transition duration-300">Cancel</Button>
                        </div>
                    </div>
                </div>
            )}

            {showReviewForm && selectedBookForReview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <ReviewForm book={selectedBookForReview} />
                </div>
            )}
        </div>
    );
}
