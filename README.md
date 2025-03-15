
## Índice


### [1. Instalación](#instalación)
   - Requisitos previos
   - Clonar el repositorio
   - Instalación de dependencias
   - Configuración de variables de entorno
   - Ejecutar

### [2. Estructura del Proyecto](#estructura-del-proyecto)
   - Descripción general de las carpetas
   - Justificación de la estructura

### [3. Pruebas Unitarias](#pruebas-unitarias)
   - Ejecución de pruebas
   
## Instalación

#### Requisitos previos

Asegurate de tener instalados:
 - [Node.js](https://nodejs.org/en/download)
 - Angular CLI
  ```bash
  npm install -g @angular/cli
  ```
 
#### Clonar el repositorio

Para clonar el proyecto, usa el siguiente comando en tu terminal:

**Usando HTTP**:
```bash
git clone https://github.com/PeterCalcina/gestion-tareas.git
```
**Usando SSH**
```bash
git clone git@github.com:PeterCalcina/gestion-tareas.git
```

#### Instalación de dependencias

Instala las dependencias usando el comando `npm` o `yarn`

```bash
npm install
```

#### Configuración de variables de entorno

En la carpeta `src` crea el siguiente directorio `environment/environment.ts` y agrega el siguiente código:

   ```typescript
   export const environment = {
     API_URL: 'https://tu-api.com',  // Aquí debes poner la URL de tu API
   };
   ```

#### Ejecutar

Una vez terminado de configurar ya estas listo para lanzar la aplicación.

```bash
ng serve
```

## Estructura del proyecto

La estructura del proyecto escogida es adecuada para aplicaciones pequeñas como esta, es fácil de implementar y manejar.

### Descripción general de las carpetas

- **`src/`**: Contiene todos los archivos fuente de la aplicación.
  - **`app/`**: Esta es la carpeta principal que contiene los componentes, servicios y módulos de la aplicación.
    - **`components/`**: Carpeta donde se encuentran los componentes de la aplicación, como los formularios de tarea, lista de tareas, etc.
    - **`services/`**: Carpeta para los servicios que gestionan la lógica de negocio y las interacciones con la API.
    - **`interfaces/`**: Aquí se encuentra el archivo `ejemplo.interface.ts` que dirige el modelo de datos usado en la aplicación.
    - **`interceptor/`**: Centralizamos el manejo de errores, esto permite manejar las respuestas de error globalmente.
  - **`environments/`**: Contiene las configuraciones como la variable de entorno que incluye las URLs de la API.

La estructura del proyecto está organizada de manera modular, lo que facilita la escalabilidad y el mantenimiento:

- **Componentes**: Cada componente tiene su propia carpeta que contiene su archivo `.ts`, `.html` y `.css` o `.scss`. Esto hace que el código sea más fácil de leer y manejar.
- **Servicios**: Los servicios son fundamentales para manejar la lógica del negocio y las interacciones con la API, por lo que se agrupan en una carpeta específica.
- **Interfaces**: Al tener una carpeta separada para los modelos, se asegura que las interfaces de los datos estén bien definidas y sean fáciles de mantener.
- **Interceptor**: Tener centralizado el manejo de errores ayuda a simplificar la lógica que se repetiria en cada servicio o componente.

## Pruebas unitarias

Este proyecto utiliza **Jasmine** para definir las pruebas y **Karma** para ejecutarlas en el navegador.

### Ejecución de pruebas

Para ejecutar las pruebas unitarias ejecuta el siguiente comando:

```bash
ng test
```

Las pruebas cubren el servicio de conexión con la API asegurando que las solicitudes se realicen correctamente.
