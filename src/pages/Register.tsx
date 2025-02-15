import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Register = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(""); // Для отображения сообщений
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Регистрация успешна! Перенаправление...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage("Ошибка соединения с сервером.");
        }
    };

    return (
        <MainLayout>
            <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">Зарегистрироваться</h1>

                {message && (
                    <p className={`mb-4 ${isError ? "text-red-600" : "text-green-600"}`}>
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />

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
                <button onClick={handleRegister} className="w-full bg-[#7C3BED] text-white py-2 rounded-md">
                    Зарегистрироваться
                </button>
            </div>
        </MainLayout>
    );
};

export default Register;
