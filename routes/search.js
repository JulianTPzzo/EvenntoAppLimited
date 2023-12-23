//Rutas de Usuarios 
//host + /api/search

const { Router } = require("express");
const { getUser } = require("../controllers/search");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Validaciones

router.use( validarJWT );

router.get("/:username", getUser );


module.exports = router;