
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

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
                <Card className="w-full max-w-md animate-fadeIn">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                            Регистрация
                        </CardTitle>
                        <CardDescription className="text-center">
                            Создайте аккаунт для доступа к сервису
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="login" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Логин
                                    </label>
                                    <Input
                                        id="login"
                                        placeholder="Придумайте логин"
                                        type="text"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        disabled={isLoading}
                                        className="text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        placeholder="example@mail.com"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        className="text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Пароль
                                    </label>
                                    <Input
                                        id="password"
                                        placeholder="Введите пароль"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="text-base"
                                    />
                                </div>
                            </div>
                            <Button 
                                onClick={handleRegister}
                                disabled={isLoading}
                                className="w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Регистрация...
                                    </>
                                ) : (
                                    "Зарегистрироваться"
                                )}
                            </Button>
                            <div className="text-center text-sm">
                                Уже есть аккаунт?{" "}
                                <button 
                                    onClick={() => navigate("/login")}
                                    className="font-medium text-primary hover:text-primary/80 focus:outline-none focus:underline"
                                >
                                    Войти
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
};

export default Register;
