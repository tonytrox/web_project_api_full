# Proyecto: Around the World - API y Frontend

Este proyecto es una aplicación web completa que permite a los usuarios registrarse, iniciar sesión, editar su perfil y compartir fotos en forma de tarjetas, además de poner y quitar "me gusta" en las publicaciones de otros usuarios.

## 🚀 Tecnologías

- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT
- Frontend: React.js
- Autenticación: JSON Web Tokens (JWT)
- Despliegue: Nginx, PM2, dominio personalizado

## 🌐 Enlaces de producción

- Frontend: [https://around.jumpingcrab.com](https://www.around.jumpingcrab.com)
- Backend (API): [https://api.around.jumpingcrab.com](https://api.around.jumpingcrab.com)

---

## 🔐 Variables de entorno (.env)

Para correr el servidor localmente, crea un archivo `.env` en la raíz del backend con el siguiente contenido:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta
```

> ⚠️ Este archivo no se incluye en el repositorio.

---

## 🛠️ Funcionalidades principales

- ✅ Registro y autorización de usuarios con JWT
- ✅ Edición de perfil
- ✅ Crear y eliminar tarjetas (posts)
- ✅ Poner y quitar "me gusta"
- ✅ Seguridad con middleware `auth`
- ✅ Manejo de errores centralizado
- ✅ Recuperación automática del servidor con PM2

---

## 🧪 Ruta de prueba de caída del servidor (solo para testing)

Durante pruebas, se puede acceder a la siguiente ruta para forzar un error y verificar la recuperación automática con PM2:

```
GET /crash-test
```

## 📦 Instalación local (modo dev)

```bash
# Clona el proyecto
git clone https://github.com/usuario/nombre-proyecto.git

# Entra al backend
cd nombre-proyecto/backend

# Instala las dependencias
npm install

# Crea el archivo .env (ver ejemplo arriba)

# Para iniciar el servidor Backend & Frontend, localmente, ubicarse en las carpetas del proyecto y ejecutar el siguiente comando:

npm run dev

```

> ⚠️ Para efectos de pruebas localmente, de presentarse problemas de conexion con el backend, se sugiere cambiar el puerto de conexión. 3001 o posterior.

```

Este proyecto integra todo el ciclo de desarrollo web moderno:
backend seguro, frontend interactivo, despliegue profesional con Nginx,
PM2 y manejo de entorno.


```
