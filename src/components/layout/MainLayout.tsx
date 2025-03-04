
import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Menu, X } from "lucide-react";
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
  const [username, setUsername] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        console.log(decoded);
        setRole(decoded.role);
        setUsername(decoded.login);
      } catch (error) {
        console.error("Ошибка при декодировании токена", error);
        localStorage.removeItem("token");
        setRole(null);
        setUsername(null);
      }
    } else {
      setRole(null);
      setUsername(null);
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
    setRole(null);
    setUsername(null);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
              Вместе-Кино
            </Link>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link to="/" className="text-foreground/60 hover:text-foreground transition-colors">
                Главная
              </Link>
              {role === "admin" && (
                <>
                  <Link to="/add-movie" className="text-foreground/60 hover:text-foreground transition-colors">
                    + Добавить фильм
                  </Link>
                  <Link to="/manage-users" className="text-foreground/60 hover:text-foreground transition-colors">
                    👤 Управление пользователями
                  </Link>
                </>
              )}
              {role && username && (
                <Link to="/profile" className="text-foreground/60 hover:text-foreground transition-colors">
                  Профиль: {username}
                </Link>
              )}
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="h-9 w-9 hover:bg-accent"
            >
              <ThemeIcon className="h-4 w-4" />
            </Button>
            <div className="hidden md:flex md:items-center md:space-x-4">
              {role ? (
                <Button variant="destructive" onClick={handleLogout}>
                  Выйти
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline">Войти</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="default">Зарегистрироваться</Button>
                  </Link>
                </>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-accent"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Мобильное меню */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden animate-fadeIn" 
            onClick={closeMobileMenu}
          >
            <div 
              className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-card p-6 shadow-lg animate-slide-in-right"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="space-y-3">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 text-lg font-semibold text-foreground hover:text-primary transition-colors" 
                    onClick={closeMobileMenu}
                  >
                    Главная
                  </Link>
                  {role === "admin" && (
                    <>
                      <Link 
                        to="/add-movie" 
                        className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors" 
                        onClick={closeMobileMenu}
                      >
                        + Добавить фильм
                      </Link>
                      <Link 
                        to="/manage-users" 
                        className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors" 
                        onClick={closeMobileMenu}
                      >
                        👤 Управление пользователями
                      </Link>
                    </>
                  )}
                  {role && username && (
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-foreground/60 hover:text-foreground transition-colors" 
                      onClick={closeMobileMenu}
                    >
                      Профиль: {username}
                    </Link>
                  )}
                </div>
                <div className="mt-auto pt-6 border-t">
                  {role ? (
                    <Button variant="destructive" onClick={handleLogout} className="w-full justify-center">
                      Выйти
                    </Button>
                  ) : (
                    <div className="grid gap-4">
                      <Link to="/login" onClick={closeMobileMenu} className="block">
                        <Button variant="outline" className="w-full justify-center">
                          Войти
                        </Button>
                      </Link>
                      <Link to="/register" onClick={closeMobileMenu} className="block">
                        <Button variant="default" className="w-full justify-center">
                          Зарегистрироваться
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
