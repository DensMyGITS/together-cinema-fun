import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, MessageCircle } from "lucide-react";

const GroupWatch = () => {
  const { id } = useParams();
  const [isChatOpen, setIsChatOpen] = useState(true);
  const roomPassword = "123456"; // В реальном приложении это должно генерироваться

  return (
    <div className="min-h-screen bg-black flex">
      <div className={`flex-1 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
        <div className="relative aspect-video">
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
            {/* Здесь будет плеер */}
            <p>Фильм {id} воспроизводится</p>
          </div>
        </div>
      </div>

      {/* Чат */}
      <div
        className={`fixed right-0 top-0 h-full w-80 bg-background/95 backdrop-blur transition-transform duration-300 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-semibold">Чат комнаты</h3>
            <div className="text-sm text-muted-foreground">
              Пароль комнаты: {roomPassword}
            </div>
          </div>
          <div className="h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {/* Здесь будут сообщения */}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Написать сообщение..."
                className="w-full p-2 rounded-md bg-background border"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка переключения чата */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed right-0 bottom-4 transform translate-x-0 z-50"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <ChevronRight /> : <MessageCircle />}
      </Button>
    </div>
  );
};

export default GroupWatch;