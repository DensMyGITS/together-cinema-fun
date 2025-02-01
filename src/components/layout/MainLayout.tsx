import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
  const [theme, setTheme] = useState<"light" | "dark" | "system">(savedTheme || "system");
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.toggle("dark", systemTheme === "dark");
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
      } catch (error) {
        console.error("Ошибка при декодировании токена", error);
        localStorage.removeItem("token");
        setRole(null); // сбросить роль при ошибке с токеном
      }
    } else {
      setRole(null); // сбросить роль, если токен удален
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null); // Сбросить роль после выхода
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <a href="/" className="text-2xl font-bold text-primary">Вместе-Кино</a>
            <Link to="/" className="text-foreground/60 hover:text-foreground">Главная</Link>
            {role === "admin" && (
              <>
                <Link to="/add-movie" className="text-foreground/60 hover:text-foreground">+ Добавить фильм</Link>
                <Link to="/manage-users" className="text-foreground/60 hover:text-foreground">👤 Управление пользователями</Link>
              </>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
              <ThemeIcon className="h-4 w-4" />
            </Button>
            {role ? (
              <Button variant="destructive" onClick={handleLogout}>
                Выйти
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="default">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="default">Зарегистрироваться</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
