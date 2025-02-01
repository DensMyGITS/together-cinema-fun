import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "@/components/movies/MovieCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data for demonstration
const mockMovies = [
  {
    id: "1",
    title: "Inception",
    image: "/placeholder.svg",
    year: 2010,
    genre: "Sci-Fi",
  },
  {
    id: "2",
    title: "The Dark Knight",
    image: "/placeholder.svg",
    year: 2008,
    genre: "Action",
  },
  {
    id: "3",
    title: "Interstellar",
    image: "/placeholder.svg",
    year: 2014,
    genre: "Sci-Fi",
  },
];

const genres = ["Все жанры", "Action", "Sci-Fi", "Drama", "Comedy"];
const years = ["Все годы", "2024", "2023", "2022", "2021", "2020"];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [selectedYear, setSelectedYear] = useState("Все годы");

  const filteredMovies = mockMovies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === "Все жанры" || movie.genre === selectedGenre;
    const matchesYear =
      selectedYear === "Все годы" || movie.year.toString() === selectedYear;
    return matchesSearch && matchesGenre && matchesYear;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Поиск фильмов..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Выберите жанр" />
          </SelectTrigger>
          <SelectContent>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Выберите год" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={movie.image}
            onWatch={() => navigate(`/watch/${movie.id}`)}
            onDetails={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;