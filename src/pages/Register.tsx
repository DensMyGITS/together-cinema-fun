
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
            <div className="max-w-md mx-auto mt-16 p-8 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                    Зарегистрироваться
                </h1>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                        disabled={isLoading}
                    />

                    <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                        disabled={isLoading}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                        disabled={isLoading}
                    />
                    <button 
                        onClick={handleRegister}
                        disabled={isLoading}
                        className="w-full bg-[#7C3BED] text-white py-2 rounded-md hover:bg-[#6B2ECC] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                    </button>
                </div>
            </div>
        </MainLayout>
    );
};

export default Register;
