import passport from "passport";
import bcrypt from "bcrypt";

// Models
import User from "../models/User.js";

export const formSignin = (req, res) => {
	res.render("users/signin");
};

export const signin = passport.authenticate("local", {
	successRedirect: "/notes",
	failureRedirect: "/users/signin",
	failureFlash: true,
});

export const formSignup = (req, res) => {
	res.render("users/signup");
};

export const signup = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;
	const errors = [];

	if (name === "" || email === "" || password === "") {
		errors.push({ text: "Campos obligatorios" });
	}
	if (password.length < 6) {
		errors.push({ text: "La contraseña debe tener como mínimo 6 caracteres" });
	}
	if (password !== confirmPassword) {
		errors.push({ text: "Las contraseñas no coinciden" });
	}
	if (errors.length > 0) {
		res.render("users/signup", {
			errors,
			name,
			email,
		});
	} else {
		const userEmail = await User.findOne({ email });
		if (userEmail) {
			req.flash("error_msg", "El email ya existe");
			res.redirect("/users/signup");
		}
		const newUser = new User({ name, email, password });
		newUser.password = await bcrypt.hash(password, 10);
		await newUser.save();
		res.redirect("/users/signin");
	}
};

export const logout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
};
