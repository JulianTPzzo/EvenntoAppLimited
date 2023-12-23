const { body, validationResult } = require('express-validator');

// Define una función de validación personalizada que verifica si al menos uno de los campos 'email' o 'username' está presente.
const validateEmailOrUsername = (value, { req }) => {
  if (!req.body.email && !req.body.username) {
    throw new Error('El email o el username es obligatorio');
  }
  return true;
};

const loginUser = async (req, res = response) => {
  // Define las reglas de validación usando express-validator
  const validationRules = [
    // Verifica que al menos uno de los campos 'email' o 'username' esté presente.
    body().custom(validateEmailOrUsername),
    // Verifica que el campo 'password' esté presente y tenga una longitud mínima de 8 caracteres.
    body('password', 'El password es obligatorio y debe ser de al menos 8 caracteres').isLength({ min: 8 }),
  ];

  // Ejecuta las reglas de validación
  await Promise.all(validationRules.map((validationRule) => validationRule.run(req)));

  // Captura los errores de validación
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    let usuario = null;

    if (email) {
      usuario = await Usuario.findOne({ email });
    } else if (username) {
      usuario = await Usuario.findOne({ username });
    }

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Usuario no encontrado',
      });
    }

    // Resto de la lógica de autenticación

    res.status(201).json({
      ok: true,
      msg: 'Login',
      email,
      password,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
};
