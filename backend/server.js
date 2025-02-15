
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
  const { login, email, password } = req.body;

  if (!login || login.length < 3) {
    return res.status(400).json({ error: "Логин должен быть не менее 3 символов" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Некорректный email" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Пароль должен быть не менее 8 символов" });
  }

  db.query("SELECT * FROM users WHERE login = ? OR email = ?", [login, email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Ошибка сервера" });
    if (result.length > 0) return res.status(400).json({ error: "Логин или email уже заняты" });

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO users (login, email, password, role) VALUES (?, ?, ?, 'user')",
      [login, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ error: "Ошибка регистрации" });
        res.json({ message: "Регистрация успешна" });
      }
    );
  });
});

// Авторизация пользователя
app.post("/login", (req, res) => {
  const { loginOrEmail, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE login = ? OR email = ?",
    [loginOrEmail, loginOrEmail],
    async (err, result) => {
      if (err) return res.status(500).json({ error: "Ошибка сервера" });
      if (result.length === 0) return res.status(400).json({ error: "Неверный логин или пароль" });

      const user = result[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json({ error: "Неверный логин или пароль" });

      const token = jwt.sign({ id: user.id, role: user.role, login: user.login }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    }
  );
});

// Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Требуется авторизация" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Недействительный токен" });
    }
    req.user = user;
    next();
  });
};

// Обновление профиля пользователя
app.post("/profile/update", authenticateToken, async (req, res) => {
  const { login, email, currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    // Проверяем существование пользователя
    db.query("SELECT * FROM users WHERE id = ?", [userId], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Ошибка сервера" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Пользователь не найден" });
      }

      const user = result[0];

      // Проверяем текущий пароль
      const passwordMatch = await bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: "Неверный текущий пароль" });
      }

      // Проверяем уникальность логина и email
      db.query(
        "SELECT * FROM users WHERE (login = ? OR email = ?) AND id != ?",
        [login, email, userId],
        async (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Ошибка сервера" });
          }
          if (result.length > 0) {
            return res.status(400).json({ error: "Логин или email уже используются" });
          }

          // Подготавливаем данные для обновления
          let updateData = { login, email };
          let updateQuery = "UPDATE users SET login = ?, email = ?";
          let updateValues = [login, email];

          // Если указан новый пароль, добавляем его в обновление
          if (newPassword) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            updateQuery += ", password = ?";
            updateValues.push(hashedNewPassword);
          }

          updateQuery += " WHERE id = ?";
          updateValues.push(userId);

          // Обновляем данные пользователя
          db.query(updateQuery, updateValues, (err) => {
            if (err) {
              return res.status(500).json({ error: "Ошибка обновления профиля" });
            }
            res.json({ message: "Профиль успешно обновлен" });
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
