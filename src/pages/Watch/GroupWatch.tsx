import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Maximize2, Minimize2, MessageSquare, X } from "lucide-react";

const GroupWatch = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [message, setMessage] = useState("");
  const roomPassword = "123456"; // This would normally be generated

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sending message
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <div className="flex-1 relative">
          <div className="relative aspect-video w-full bg-black">
            <video
              className="w-full h-full"
              controls
              src="https://example.com/video.mp4"
            />
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
                onClick={() => setIsChatVisible(!isChatVisible)}
              >
                {isChatVisible ? (
                  <X className="h-4 w-4" />
                ) : (
                  <MessageSquare className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/20 hover:bg-background/40"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isChatVisible && (
          <div className="w-80 border-l bg-card">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Чат комнаты</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Пароль комнаты: {roomPassword}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Chat messages would go here */}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Написать сообщение..."
                  className="w-full"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupWatch;