import { Card, CardContent } from "@/components/ui/card";

type BookProps = {
    title: string;
    author: string;
    description: string;
};

export default function BookCard({ title, author, description }: BookProps) {
    return (
        <Card className="max-w-sm shadow-lg">
            <CardContent>
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-gray-500">par {author}</p>
                <p className="mt-2">{description}</p>
            </CardContent>
        </Card>
    );
}
