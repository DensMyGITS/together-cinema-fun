import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Очистить сессию и выйти из аккаунта
        navigate("/login"); // Перенаправление на страницу авторизации
    }, [navigate]);

    return null; // Страница выхода не требует отображения
};

export default Logout;
