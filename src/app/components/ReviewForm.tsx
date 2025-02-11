"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ReviewForm() {
    const [review, setReview] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Critique soumise : ${review}`);
        setReview("");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
          className="w-full border p-2 rounded"
          placeholder="Votre critique..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
      />
            <Button type="submit">Envoyer</Button>
        </form>
    );
}
