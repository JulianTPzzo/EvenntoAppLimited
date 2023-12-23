//Post Routes
// /api/post

const { Router } = require("express");
const { getPosts, createPost, deletePost } = require("../controllers/posts");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const router = Router();

// Validaciones

router.use( validarJWT );

//Obtener Posteos
router.get( '/', getPosts );

// Crear Posteos
router.post(
    '/', 
    [
        // check('title', 'El título es obligatorio').not().isEmpty(),
        // check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        // check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    createPost,
);

// Actualizar Posteos
// router.put(
//     '/:id', 
//     [
//         check('title', 'El título es obligatorio').not().isEmpty(),
//         check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
//         check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
//         check('event_venue', 'El lugar de evento es obligatorio').not().isEmpty(),
//         validarCampos
//     ],
//     updateEvent,
// );

// Borrar Posteo
router.delete(
    '/:id', 
    [

    ],
    deletePost,
);

module.exports = router;