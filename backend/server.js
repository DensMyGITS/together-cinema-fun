require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Подключение к БД
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) console.error("Ошибка подключения к БД:", err);
  else console.log("Подключено к MySQL");
});

// Регистрация пользователя (по умолчанию 'user')
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Ошибка сервера" });
    if (result.length > 0) return res.status(400).json({ error: "Email уже зарегистрирован" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (email, password, role) VALUES (?, ?, 'user')",
      [email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: "Ошибка регистрации" });
        res.json({ message: "Регистрация успешна" });
      }
    );
  });
});

// Авторизация пользователя
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Ошибка сервера" });
    if (result.length === 0) return res.status(400).json({ error: "Неверные учетные данные" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Неверные учетные данные" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token, role: user.role });
  });
});

// Middleware для проверки токена
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Нет доступа" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Неверный токен" });
    req.user = decoded;
    next();
  });
};

// Middleware для проверки роли администратора
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Доступ запрещён" });
  next();
};

// Пример защищённого маршрута (только для админа)
app.get("/admin/dashboard", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Добро пожаловать в админку!" });
});

// Запуск сервера
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
