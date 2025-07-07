# Используем официальный Node.js образ
FROM node:24

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Открываем порт для разработки (если используешь Create React App, то это порт 3000)
EXPOSE 3000

# Запускаем команду для старта проекта (для Create React App это обычно npm start)
CMD ["npm", "start"]
