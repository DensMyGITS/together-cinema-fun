import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  // Импортируем Link для маршрутов

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  // Читаем текущую тему из localStorage, если она существует
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
  
  // Если в localStorage нет сохранённой темы, используем системную
  const [theme, setTheme] = useState<"light" | "dark" | "system">(savedTheme || "system");

  useEffect(() => {
    // Сохраняем текущую тему в localStorage
    localStorage.setItem("theme", theme);

    // Применяем тему
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);  // Эффект будет срабатывать при изменении темы

  const toggleTheme = () => {
    const themes: ("light" | "dark" | "system")[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  const ThemeIcon = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }[theme];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-bold text-primary">
              Вместе-Кино
            </a>
            <Link to="/" className="text-foreground/60 hover:text-foreground">
              Главная
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9"
            >
              <ThemeIcon className="h-4 w-4" />
            </Button>
            {/* Добавим ссылки на страницы входа и регистрации */}
            <Link to="/login">
              <Button variant="default">Войти</Button>
            </Link>
            <Link to="/register">
              <Button variant="default">Зарегистрироваться</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
