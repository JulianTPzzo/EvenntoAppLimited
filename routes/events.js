//Events Routes
// /api/events

const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");

const router = Router();

// Validaciones

router.use( validarJWT );

//Obtener Eventos
router.get( '/', getEvents );

// Crear Eventos
router.post(
    '/', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        check('event_venue', 'El lugar de evento es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createEvent,
);

// Actualizar Evento
router.put(
    '/:id', 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
        check('event_venue', 'El lugar de evento es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateEvent,
);

// Borrar Evento
router.delete(
    '/:id', 
    [

    ],
    deleteEvent,
);

module.exports = router;