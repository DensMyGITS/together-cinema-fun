import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MovieCard from "@/components/movies/MovieCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Мокаем данные о фильмах
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Dark Knight",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleWatch = (movieId: number) => {
    console.log("Watch movie:", movieId);
  };

  const handleDetails = (movieId: number) => {
    console.log("Show details for movie:", movieId);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск фильмов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MOCK_MOVIES.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={movie.image}
              onWatch={() => handleWatch(movie.id)}
              onDetails={() => handleDetails(movie.id)}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
