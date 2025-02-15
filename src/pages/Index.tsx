
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import MovieCard from "@/components/movies/MovieCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

// Мокаем данные о фильмах
const MOCK_MOVIES = [
  {
    id: 1,
    title: "Inception",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
    genres: ["Фантастика", "Боевик", "Триллер"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop",
    genres: ["Боевик", "Криминал", "Драма"],
  },
  {
    id: 3,
    title: "Interstellar",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
    genres: ["Фантастика", "Драма", "Приключения"],
  },
];

// Получаем уникальные жанры из фильмов
const GENRES = Array.from(new Set(MOCK_MOVIES.flatMap(movie => movie.genres))).sort();

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleWatch = (movieId: number) => {
    console.log("Watch movie:", movieId);
  };

  const handleDetails = (movieId: number) => {
    console.log("Show details for movie:", movieId);
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  // Фильтрация фильмов
  const filteredMovies = MOCK_MOVIES.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => movie.genres.includes(genre));
    return matchesSearch && matchesGenres;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Поиск */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск фильмов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Фильтры по жанрам */}
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <Button
              key={genre}
              variant={selectedGenres.includes(genre) ? "default" : "outline"}
              onClick={() => toggleGenre(genre)}
              className="transition-all"
            >
              {genre}
            </Button>
          ))}
        </div>

        {/* Результаты */}
        {filteredMovies.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            Фильмы не найдены
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMovies.map((movie) => (
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
        )}
      </div>
    </MainLayout>
  );
};

export default Index;
