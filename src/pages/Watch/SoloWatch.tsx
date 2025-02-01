import { useParams } from "react-router-dom";

const SoloWatch = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-black">
      <div className="relative aspect-video">
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          {/* Здесь будет плеер */}
          <p>Фильм {id} воспроизводится</p>
        </div>
      </div>
    </div>
  );
};

export default SoloWatch;