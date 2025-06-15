# 🌊 Oceans App – Full Stack Challenge

Aplicación web completa para la gestión de productos, órdenes y usuarios con autenticación basada en roles (`admin` / `mesero`).

---

## 🚀 Instrucciones para correr el proyecto

### 1. Clona el repositorio

```bash
git clone https://github.com/nikiclan16/oceans-challenge-backend.git
cd oceans-challenge-backend
- npm install
- docker-compose up -d
- npm run dev

🛠 Tecnologías usadas
Backend (Node + Express + PostgreSQL)
Node.js

Express.js

PostgreSQL + pg

TypeScript

JWT para autenticación

Bcrypt para hashing de contraseñas

Docker

Levanta la base de datos

Explicaciones técnicas
🔐 Autenticación con JWT: el backend emite tokens firmados, que se almacenan en localStorage y se incluyen automáticamente en headers mediante Axios.

🛡 Protección de rutas: En el frontend se asegura que solo usuarios autenticados o con rol admin accedan a vistas específicas.

🧾 Gestión de órdenes y productos: se permite crear, editar y eliminar productos/órdenes mediante modales reutilizables con lógica centralizada.

📃 Paginación del lado del servidor: productos se cargan de forma paginada usando parámetros page y limit en la consulta.

```
