//Rutas de Usuarios / Auth
//host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();
const {
  createUser,
  loginUser,
  renewUser,
  getUser,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

router.post(
  "/new",
  [
    //middlewares
    check("username", "El username es obligatorio")
      .not()
      // .isLength({ max: 20 })
      .isEmpty(),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password es obligatorio y debe ser de al menos 8 caracteres"
    )
    .isLength({min: 8})
    // .isStrongPassword({
    //   min: 8,
    //   minLowercase: 1,
    //   minUppercase: 1,
    //   minNumbers: 1,
    //   minSymbols: 1,
    // })
    ,
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    //middlewares
    (req, res, next) => {
      // Verificar si se proporciona un email o un username
      if (!req.body.email && !req.body.username) {
        return res.status(400).json({
          ok: false,
          errors: [{ msg: "Debes proporcionar email o username" }],
        });
      }
      next();
    },
    check(
      "password",
      "El password es obligatorio y debe de ser de mas de 8 caracteres"
    ).isLength({ min: 8 }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewUser);

module.exports = router;
