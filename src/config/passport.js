import passport from "passport";
import passportLocal from "passport-local";
const LocalStrategy = passportLocal.Strategy;
import bcrypt from "bcrypt";

// Models
import User from "../models/User.js";

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		async (email, password, done) => {
			// Verifiar email del usuario
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: "email o contraseña no valido" });
			} else {
				// Verificar la contraseña del usuario
				const match = await bcrypt.compare(password, user.password);
				if (!match) {
					return done(null, false, { message: "email o contraseña no valido" });
				} else {
					return done(null, user);
				}
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, { password: 0, date: 0 }, (err, user) => {
		done(err, user);
	});
});
