## Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu computadora:

*   [Docker Desktop](https://www.docker.com/products/docker-desktop) (o Docker Engine y Docker Compose por separado).

## Cómo ejecutar la aplicación

Para ejecutar la aplicación, sigue estos pasos sencillos:
1.  Ejecuta el siguiente comando para construir e iniciar los contenedores:

    ```bash
    docker compose up --build
    ```

2.  La aplicación estará disponible en `http://localhost:3000`.

## Rutas Principales

A continuación se listan las rutas principales de la API para que puedas probarlas (usando Postman, curl, etc.).

### Autenticación (`/auth`)

*   **Registro de usuario**
    *   **Método:** `POST`
    *   **URL:** `http://localhost:3000/auth/register`
    *   **Body (JSON):**
        ```json
        {
          "email": "test@example.com",
          "password": "password123",
          "name": "Test User"
        }
        ```

*   **Inicio de sesión**
    *   **Método:** `POST`
    *   **URL:** `http://localhost:3000/auth/login`
    *   **Body (JSON):**
        ```json
        {
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    *   **Respuesta:** Recibirás un `accessToken` que deberás usar para las rutas protegidas.

### Tareas (`/tasks`)

Estas rutas requieren autenticación. Debes incluir el token recibido en el login en los headers de la petición: `Authorization: Bearer <TU_TOKEN>`.

*   **Crear una tarea**
    *   **Método:** `POST`
    *   **URL:** `http://localhost:3000/tasks`
    *   **Body (JSON):**
        ```json
        {
          "title": "Mi primera tarea",
          "description": "Descripción de la tarea"
        }
        ```

*   **Listar tareas del usuario**
    *   **Método:** `GET`
    *   **URL:** `http://localhost:3000/tasks`
