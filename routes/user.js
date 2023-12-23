//Rutas de Usuarios 
//host + /api/user

const { Router } = require("express");

const router = Router();

const { getUser } = require("../controllers/user");
const { validarJWT } = require("../middlewares/validar-jwt");

// Validaciones

router.use( validarJWT );

router.get("/:username", getUser );

module.exports = router;