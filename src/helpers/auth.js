export const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error_msg", "No authorizado");
	res.redirect("/users/signin");
};
