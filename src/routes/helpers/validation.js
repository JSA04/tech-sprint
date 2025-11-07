const { validationResult } = require("express-validator");

// Handler de validação para usar nas rotas com express-validator
// routeOnError: string ou function(req) => string
function handleValidation(routeOnError) {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msgs = errors.array().map((e) => e.msg);
      req.flash("error_msg", msgs.join(" | "));
      const redirectTo =
        typeof routeOnError === "function" ? routeOnError(req) : routeOnError;
      return res.redirect(redirectTo);
    }
    next();
  };
}

module.exports = { handleValidation };
