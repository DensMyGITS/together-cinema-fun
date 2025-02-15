import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  // Импортируем Link для маршрутов

interface MovieCardProps {
  title: string;
  image: string;
  onWatch: () => void;
  onDetails: () => void;
  id: number;  // Добавим id фильма
}

const MovieCard = ({ title, image, onWatch, onDetails, id }: MovieCardProps) => {
  return (
    <div className="group movie-card">
      <img
        src={image}
        alt={title}
        className="h-[400px] w-full object-cover"
      />
      <div className="movie-card-overlay">
        <div className="absolute bottom-0 w-full p-4 space-y-2">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="flex space-x-2">
            <Button
              onClick={onWatch}
              className="flex-1"
              variant="default"
            >
              <Play className="mr-2 h-4 w-4" />
              Смотреть
            </Button>
            {/* Кнопка "Подробнее" теперь ведет на страницу с деталями фильма */}
            <Link to={`/movie/${id}`} className="flex-1">
              <Button variant="secondary" className="w-full">
                <Info className="mr-2 h-4 w-4" />
                Подробнее
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
