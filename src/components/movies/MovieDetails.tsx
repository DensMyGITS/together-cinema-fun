import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const MovieDetails = () => {
    const { id } = useParams(); // Получаем id фильма из URL

    // Заглушка данных, заменить на реальные данные из API
    const movie = {
        title: "Inception",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop",
        description: "Описание фильма...",
        year: 2010,
        directors: [{ name: "Christopher Nolan", avatar: "https://some-avatar-url.com" }],
        actors: [{ name: "Leonardo DiCaprio", avatar: "https://some-avatar-url.com" }]
    };

    return (
        <MainLayout>
            <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
                <img src={movie.image} alt={movie.title} className="w-full lg:w-1/2" />
                <div className="lg:w-1/2 px-4">
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="mt-4">{movie.description}</p>
                    <p className="mt-2 text-sm text-gray-500">Год выпуска: {movie.year}</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">Смотреть</button>

                    <div className="mt-6">
                        <h3 className="font-bold">Режиссёры:</h3>
                        <div className="flex space-x-4">
                            {movie.directors.map((director, index) => (
                                <div key={index} className="flex items-center">
                                    <img src={director.avatar} alt={director.name} className="w-10 h-10 rounded-full" />
                                    <p className="ml-2">{director.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-bold">Актёры:</h3>
                        <div className="flex space-x-4">
                            {movie.actors.map((actor, index) => (
                                <div key={index} className="flex items-center">
                                    <img src={actor.avatar} alt={actor.name} className="w-10 h-10 rounded-full" />
                                    <p className="ml-2">{actor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default MovieDetails;
