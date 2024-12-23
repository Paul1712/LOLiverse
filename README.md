# LOLiverse
Aplicación móvil creada en React Native con Expo, diseñada para explorar chistes temáticos y gestionar favoritos de manera sencilla y accesible.

## Índice

1. [Instalación](#instalación)
2. [Funcionamiento](#funcionamiento)
3. [Características](#características)
4. [Pantallas Claves](#pantallas-clave)
5. [Detalles Técnicos](#detalles-técnicos)
6. [Contribuciones](#contribuciones)
7. [Entorno de Desarrollo](#entorno-de-desarrollo)
8. [Desarrollador](#desarrollador)


## Instalación
Asegúrate de tener Node.js, npm o yarn, y Expo CLI instalados. Luego, sigue estos pasos:

1. Clona el repositorio:

    git clone https://github.com/tu-usuario/LOLiverse.git

2. Navega al directorio de la aplicación:

    cd LOLiverse

3. Instala las dependencias:

    npm install

    O si prefieres Yarn:

    yarn install

4. Inicia el servidor de desarrollo y selecciona el emulador o dispositivo físico para ejecutar la aplicación. También puedes probarla en web utilizando el modo responsivo (las notificaciones pueden no funcionar correctamente en web):

    expo start

    La aplicación estará disponible en [http://localhost:8081/].
   

## Funcionamiento

- Inicio de sesión: Una pantalla de registro permite al usuario ingresar su nombre, correo electrónico y contraseña. Los datos se persisten localmente usando Zustand y AsyncStorage.

- Gestión de sesión: El usuario puede iniciar sesión con validaciones hechas mediante react-hook-form y Yup. Los datos de sesión permanecen guardados para evitar el reingreso.

- Navegación: Un sistema fluido entre pantallas gracias a React Navigation, con soporte para Drawer Navigation.

- Integración con APIs: Consumo de endpoints de https://api.chucknorris.io para ofrecer contenido dinámico.


## Características

- **Lenguaje**: React Native.
- **Marco de trabajo**: Expo.
- **Gestión de estado**: Zustand con AsyncStorage.
- **Estilos**: Diseño amigable y adaptado para dispositivos móviles.
- **Servicios**: Consumidos a través de Axios.
- **Validaciones**: Formularios validados con react-hook-form y Yup.
- **Notificaciones**: Implementadas con Expo Notifications (locales y remotas).
- **Gestión offline**: Detección de desconexión a Internet y mensajes al usuario.


## Pantallas clave

- **Pantalla de Inicio**: Muestra un listado de categorías obtenidas desde https://api.chucknorris.io/jokes/categories. Permite seleccionar una categoría y navegar a la pantalla de chistes.

- **Pantalla de Chistes**: Consume https://api.chucknorris.io/jokes/random?category={category} y muestra un chiste aleatorio según la categoría seleccionada. Permite marcar chistes como favoritos.

- **Pantalla de Favoritos**: Muestra los chistes marcados como favoritos y permite eliminarlos. Usa Zustand y AsyncStorage para persistir los datos.

- **Pantalla de Búsqueda**: Proporciona un buscador para consultar chistes mediante https://api.chucknorris.io/jokes/search?query={query}. Los resultados se muestran en una lista interactiva.

- **Pantalla de Perfil**: Muestra la información del usuario y ofrece la opción de cerrar sesión.


## Detalles técnicos

- **Arquitectura modular**: Organización por carpetas para componentes, servicios, pantallas y utilidades.

- **Validación offline**: Manejo de estado y alertas para usuarios sin conexión.

- **Dispositivos de prueba**: iPhone 11 Pro Max e iPhone 12.


## Entorno de desarrollo:

Node: v20.17.0

npm: 10.8.2

Expo: ~52.0.20


## Contribuciones

¡Contribuciones son bienvenidas! Si encuentras algún error o tienes ideas para mejorar la aplicación:

Haz un fork del repositorio.

Crea una rama para tu funcionalidad o corrección:

git checkout -b feature/nueva-funcionalidad

Envía un pull request describiendo los cambios realizados.

## Desarrollador

Este proyecto está desarrollado por Rocneyker Paul Cordero⚡️
