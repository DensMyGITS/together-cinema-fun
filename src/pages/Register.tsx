
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleRegister = async () => {
        if (!login || !email || !password) {
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Пожалуйста, заполните все поля"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Успешно",
                    description: "Регистрация успешна! Перенаправление..."
                });
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast({
                    variant: "destructive",
                    title: "Ошибка",
                    description: data.error
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Ошибка",
                description: "Ошибка соединения с сервером"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white">
                            Зарегистрироваться
                        </h1>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Создайте свой аккаунт для доступа к сервису
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Логин
                                </label>
                                <input
                                    id="login"
                                    type="text"
                                    placeholder="Введите логин"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white 
                                             focus:ring-2 focus:ring-primary focus:border-transparent"
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Введите email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white 
                                             focus:ring-2 focus:ring-primary focus:border-transparent"
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Пароль
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white 
                                             focus:ring-2 focus:ring-primary focus:border-transparent"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <button 
                            onClick={handleRegister}
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm 
                                     text-sm font-medium text-white bg-primary hover:bg-primary/90 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-colors duration-200"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Регистрация...
                                </span>
                            ) : (
                                "Зарегистрироваться"
                            )}
                        </button>

                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Уже есть аккаунт?{" "}
                            <button 
                                onClick={() => navigate("/login")}
                                className="font-medium text-primary hover:text-primary/80 focus:outline-none focus:underline"
                            >
                                Войти
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Register;
