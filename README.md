# Fullstack CRUD (Create, Read, Update, Delete) con MongoDb

## Esta aplicación esta basada en el patrón de arquitectura modelo-vista-controlador (MVC)

Este patrón divide una aplicación interactiva en tres partes diferenciadas:

- **Modelo**: Contiene la funcionalidad central y los datos.
- **Vista**: Muestra la información al usuario, siempre es posible definir una o más vistas para una misma aplicación.
- **Controlador**: Maneja la entrada del usuario. Esto se hace para separar las representaciones internas de la información de las formas en que se presenta y se acepta la información del usuario. De esta manera se desacopla los componentes y permite una reutilización eficiente del código.

## Dependencias de Producción

1. **bcrypt**: Una biblioteca para ayudarte a codificar contraseñas. La función bcrypt es el algoritmo hash de contraseña predeterminado para OpenBSD[2] y fue el predeterminado para algunas distribuciones de Linux como SUSE Linux.
2. **connect-flash**: El flash es un área especial de la sesión que se utiliza para almacenar mensajes. Los mensajes se escriben en la memoria flash y se borran después de mostrarse al usuario. El flash generalmente se usa en combinación con redireccionamientos, lo que garantiza que el mensaje esté disponible para la siguiente página que se va a representar.
3. **express**: Web Applications Express es un marco de aplicación web de Node.js mínimo y flexible que proporciona un conjunto sólido de funciones para aplicaciones web y móviles. API Con una miríada de métodos de utilidad HTTP y middleware a su disposición, crear una API sólida es rápido y fácil. Performance Express proporciona una capa delgada de características fundamentales de aplicaciones web, sin oscurecer las características de Node.js que conoce y ama.
4. **express-handlebars**: Un motor de visualización de vistas para Express.
5. **express-session**: Middleware de sesión simple para Express
6. **method-override**: Le permite usar verbos HTTP como PUT o DELETE en lugares donde el cliente no lo admite.
7. **mongoose**: Es una herramienta de modelado de objetos MongoDB diseñada para trabajar en un entorno asíncrono. Mongoose admite tanto promesas como devoluciones de llamada. Al utilizar mongoose como ODM (Object Data Modeling - Modelado de datos de objetos), permite interactuar con una base de datos noSQL, creando la estructura de cada documento que será parte de una colección de esta base de datos.
8. **passport**: Autenticación simple y discreta para Node.js.
9. **passport-local**: Estrategia de autenticación de nombre de usuario y contraseña local para Passport.

## Dependencias de Desarrollo

1. **nodemon**: Script de monitor simple para usar durante el desarrollo de una aplicación Node.js.

## Estructura de la aplicación

Esta aplicación web, esta compuesta de tres módulos:

1. Módulo de inicio que esta compuesto por dos páginas:
   1.1 Inicio
   1.2 Acerca de
2. Módulo de control de usuarios
   2.1 Registro
   2.2 Iniiar sesión
3. Módulo de Notas - CRUD
   3.1 Ver todas las Notas
   3.2 Nueva Nota
   3.3 Editar Nota
   3.4 Eliminar Nota

Para usar este proyecto, descargarlo e instalar las dependencias
`npm i`

Para ejecutar el servidor de desarrollo utilizar:
`npm run dev`

**Nota**: Al usar mongoose en esta aplicación, no es necesario crear la base de datos y las colecciones que se utilizan, ya que alinsertar por primera vez mongoose se encargara de esto.

Saludos
