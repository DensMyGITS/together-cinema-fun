import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Film, Play, User, Users } from "lucide-react";

interface Person {
  id: number;
  name: string;
  avatar: string;
}

interface MovieDetailsProps {
  id: string;
  title: string;
  description: string;
  year: number;
  image: string;
  directors: Person[];
  actors: Person[];
}

const MovieDetails = () => {
  // This would normally come from a route parameter and API call
  const mockMovie: MovieDetailsProps = {
    id: "1",
    title: "Название фильма",
    description: "Описание фильма...",
    year: 2024,
    image: "/placeholder.svg",
    directors: [
      { id: 1, name: "Режиссер 1", avatar: "/placeholder.svg" },
      { id: 2, name: "Режиссер 2", avatar: "/placeholder.svg" },
    ],
    actors: [
      { id: 1, name: "Актер 1", avatar: "/placeholder.svg" },
      { id: 2, name: "Актер 2", avatar: "/placeholder.svg" },
      { id: 3, name: "Актер 3", avatar: "/placeholder.svg" },
    ],
  };

  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);

  const handleWatchAlone = () => {
    // Handle watch alone logic
    window.location.href = `/watch/${mockMovie.id}/solo`;
  };

  const handleWatchWithFriends = () => {
    // Handle watch with friends logic
    window.location.href = `/watch/${mockMovie.id}/group`;
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
          <img
            src={mockMovie.image}
            alt={mockMovie.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{mockMovie.title}</h1>
          <p className="text-lg text-muted-foreground">{mockMovie.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">
              Год выпуска: {mockMovie.year}
            </span>
            <Dialog open={isWatchModalOpen} onOpenChange={setIsWatchModalOpen}>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Play className="mr-2 h-4 w-4" />
                  Смотреть
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Как вы хотите смотреть фильм?</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button onClick={handleWatchAlone} variant="outline" size="lg">
                    <User className="mr-2 h-4 w-4" />
                    Один
                  </Button>
                  <Button
                    onClick={handleWatchWithFriends}
                    variant="default"
                    size="lg"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    С друзьями
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Режиссеры</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockMovie.directors.map((director) => (
              <div
                key={director.id}
                className="flex items-center space-x-3 p-3 rounded-lg bg-card"
              >
                <img
                  src={director.avatar}
                  alt={director.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-medium">{director.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Актеры</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockMovie.actors.map((actor) => (
              <div
                key={actor.id}
                className="flex items-center space-x-3 p-3 rounded-lg bg-card"
              >
                <img
                  src={actor.avatar}
                  alt={actor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-medium">{actor.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetails;