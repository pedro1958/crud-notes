import express from "express";
import expHBS from "express-handlebars";
const { engine } = expHBS;
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";

// Método para obtener __dirname no establecido en EJS Modules
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a base de datos
import { conn } from "./config/db.js";

// Direcciones de rutas
import IndexRoutes from "./routes/index.routes.js";
import NotesRoutes from "./routes/notes.routes.js";
import UserRoutes from "./routes/user.routes.js";

// Iniciar la aplicación
const app = express();
conn();
import "./config/passport.js";

// Configuración
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "/views"));
app.engine(
	".hbs",
	engine({
		defaultLayout: "main",
		layoutsDir: path.join(app.get("views"), "/layouts"),
		partialsDir: path.join(app.get("views"), "/partials"),
		extname: ".hbs",
	})
);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
	session({
		secret: "workfinalutn",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variales Globales
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.eror_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	res.locals.user = req.user || null;
	next();
});

// Rutas
app.use("/", IndexRoutes);
app.use("/notes", NotesRoutes);
app.use("/users", UserRoutes);

// Archivos estaticos
app.use(express.static(path.join(__dirname, "public")));

// Iniciar el servidor
app.listen(app.get("port"), () =>
	console.log(`Servidor escuchando el http://localhost:${app.get("port")}`)
);
