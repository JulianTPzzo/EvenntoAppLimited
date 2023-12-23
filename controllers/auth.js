const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { username, email, password } = req.body;

  try {
    const usuarioEmail = await Usuario.findOne({ email });
    const usuarioUsername = await Usuario.findOne({ username });

    if (usuarioEmail || usuarioUsername) {
      let msg = usuarioEmail
        ? "Un usuario existe con ese correo"
        : "El nombre de usuario está en uso";
      return res.status(400).json({
        ok: false,
        msg: msg,
      });
    }

    let usuario = new Usuario(req.body);

    //Encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name, usuario.username);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      username: usuario.username,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por faver hable con el administrador",
    });
  }
};

const loginUser = async (req, res = response) => {
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
        msg: "El usuario no existe",
      });
    }

    // Confirmar los passwords
    const validarPassword = bcrypt.compareSync(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name, usuario.username);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      username: usuario.username,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const renewUser = async (req, res = response) => {
  const { uid, name, username } = req;

  //Generar JWT
  const token = await generarJWT(uid, name, username);

  res.json({
    ok: true,
    uid,
    name,
    username,
    token,
  });
};

module.exports = {
  createUser,
  loginUser,
  renewUser,

};

