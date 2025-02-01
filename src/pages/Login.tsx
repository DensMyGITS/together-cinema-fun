import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Для сообщений
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                setMessage("Вход выполнен! Перенаправление...");
                setIsError(false);
                setTimeout(() => navigate("/"), 2000);
            } else {
                setMessage(data.error);
                setIsError(true);
            }
        } catch (error) {
            setMessage("Ошибка соединения с сервером.");
            setIsError(true);
        }
    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Войти в аккаунт</h1>
                
                {message && (
                    <p className={`mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Электронная почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <button onClick={handleLogin} className="w-full bg-[#7C3BED] text-white py-2 rounded-md">
                    Войти
                </button>
            </div>
        </MainLayout>
    );
};

export default Login;
